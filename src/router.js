import express from 'express';
import { addProduct, addReview, deleteReview, getProduct, getProducts, getReview, updateReview } from './database.js';
import { unlink } from 'node:fs/promises';
import { upload } from './upload.js';
import { PRODUCT_GENDERS, PRODUCT_TYPES, PRODUCT_SIZES, validateProduct } from './product-validation.js';

const router = express.Router();
const MIN_REVIEW_DATE = '2018-01-01';
const MAX_REVIEW_DATE = '2030-12-31';
const MAX_AUTHOR_LENGTH = 50;
const MAX_COMMENT_LENGTH = 200;

function getToday() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function validateReview(review) {
    const errors = [];
    const { author, date, rating, comment } = review;

    if (typeof author !== 'string' || author.trim().length === 0) {
        errors.push('El usuario es obligatorio.');
    } else {
        if (author !== author.trim()) {
            errors.push('El usuario no puede tener espacios al principio o al final.');
        }
        if (author.length > MAX_AUTHOR_LENGTH) {
            errors.push('El usuario no puede superar los 50 caracteres.');
        }
    }

    const validDateFormat = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date);
    const parsedDate = validDateFormat ? new Date(`${date}T00:00:00.000Z`) : null;
    const validDate = parsedDate
        && !Number.isNaN(parsedDate.getTime())
        && parsedDate.toISOString().slice(0, 10) === date;
    if (!validDate) {
        errors.push('La fecha debe ser válida y tener el formato AAAA-MM-DD.');
    } else {
        if (date < MIN_REVIEW_DATE || date > MAX_REVIEW_DATE) {
            errors.push('La fecha debe estar entre el 1 de enero de 2018 y el 31 de diciembre de 2030.');
        }
        const today = getToday();
        if (date > today) {
            errors.push('La fecha no puede ser posterior a hoy');
        }
    }

    const numericRating = typeof rating === 'number'
        ? rating
        : typeof rating === 'string' && /^[1-5]$/.test(rating)
            ? Number(rating)
            : NaN;
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
        errors.push('La puntuación debe ser un número entero entre 1 y 5.');
    }

    if (typeof comment !== 'string' || comment.trim().length === 0) {
        errors.push('El comentario es obligatorio.');
    } else if (comment.length < 10 || comment.length > MAX_COMMENT_LENGTH) {
        errors.push('El comentario debe tener entre 10 y 200 caracteres.');
    }

    return errors;
}

function getRatingOptions(selectedRating = '') {
    return [1, 2, 3, 4, 5].map((value) => ({
        value,
        required: value === 1,
        selected: String(value) === String(selectedRating),
    }));
}

function getProductFormData(product = {}) {
    return {
        productForm: true,
        formTitle: 'Crear producto',
        formAction: '/product/new',
        cancelLink: '/',
        imageRequired: true,
        product,
        genderOptions: PRODUCT_GENDERS.map(value => ({ value, selected: value === product.gender })),
        typeOptions: PRODUCT_TYPES.map(value => ({ value, selected: value === product.productType })),
        sizeOptions: PRODUCT_SIZES.map(value => ({ value, selected: (product.sizes || []).includes(value) })),
    };
}

function receiveProductImage(req, res, next) {
    upload.single('image')(req, res, error => {
        if (error) {
            return res.status(400).render('message', {
                messageTitle: 'No se ha podido subir la imagen',
                message: error.code === 'LIMIT_FILE_SIZE'
                    ? 'La imagen no puede superar los 5 MB.'
                    : 'Selecciona un único archivo JPEG, PNG, WebP o GIF válido.',
                link: req.originalUrl,
                buttonText: 'Volver al formulario',
            });
        }
        next();
    });
}

router.get('/product/new', (req, res) => {
    res.render('form', getProductFormData());
});

router.post('/product/new', receiveProductImage, async (req, res, next) => {
    let saved = false;
    try {
        const body = req.body || {};
        // Only accept the fields used by the product form.
        const product = {
            product: typeof body.product === 'string' ? body.product.trim() : '',
            price: body.price,
            gender: body.gender,
            productType: body.productType,
            colour: typeof body.colour === 'string' ? body.colour.trim() : '',
            sizes: Array.isArray(body.sizes) ? body.sizes : typeof body.sizes === 'string' ? [body.sizes] : [],
            comment: typeof body.comment === 'string' ? body.comment.trim() : '',
            materials: typeof body.materials === 'string' ? body.materials.trim() : '',
        };
        const errors = await validateProduct(product);
        if (!req.file) {
            errors.push('Selecciona una imagen para el producto.');
        }
        if (errors.length > 0) {
            if (req.file) await unlink(req.file.path);
            return res.status(400).render('message', {
                messageTitle: 'No se ha podido crear el producto',
                message: 'Corrige los siguientes datos en el formulario.',
                hasErrors: true,
                errors,
                link: '/product/new',
                buttonText: 'Volver al formulario',
            });
        }

        product.price = Number(product.price);
        product.image = `/uploads/${req.file.filename}`;
        product.reviews = [];
        const id = await addProduct(product);
        saved = true;
        res.render('message', {
            messageTitle: 'Producto creado',
            message: 'El producto se ha guardado correctamente.',
            link: `/product/${id}`,
            buttonText: 'Ver producto',
        });
    } catch (error) {
        if (!saved && req.file) {
            try {
                await unlink(req.file.path);
            } catch (cleanupError) {
                if (cleanupError.code !== 'ENOENT') console.error(cleanupError);
            }
        }
        next(error);
    }
});

router.get('/product/:id', async (req, res, next) => {
    try {
        const product = await getProduct(req.params.id);
        if (!product) {
            return res.status(404).send('Producto no encontrado.');
        }
        res.render('detail', { product, ratingOptions: getRatingOptions(), today: getToday() });
    } catch (error) {
        next(error);
    }
});

router.get('/product/:id/review/:reviewId/edit', async (req, res, next) => {
    try {
        const review = await getReview(req.params.id, req.params.reviewId);
        if (!review) {
            return res.status(404).send('Producto o reseña no encontrada.');
        }
        res.render('edit_review', {
            productId: req.params.id,
            review,
            today: getToday(),
            ratingOptions: getRatingOptions(review.rating),
        });
    } catch (error) {
        next(error);
    }
});

router.post('/product/:id/review/:reviewId/edit', async (req, res, next) => {
    try {
        const existingReview = await getReview(req.params.id, req.params.reviewId);
        if (!existingReview) {
            return res.status(404).send('Producto o reseña no encontrada.');
        }

        const body = req.body || {};
        const reviewInput = {
            author: typeof body.author === 'string' ? body.author : '',
            date: typeof body.date === 'string' ? body.date : '',
            rating: typeof body.rating === 'string' ? body.rating : '',
            comment: typeof body.comment === 'string' ? body.comment : '',
        };
        const errors = validateReview(reviewInput);
        if (errors.length > 0) {
            return res.status(400).render('edit_review', {
                productId: req.params.id,
                review: { ...existingReview, ...reviewInput },
                errors,
                today: getToday(),
                ratingOptions: getRatingOptions(reviewInput.rating),
            });
        }

        const updated = await updateReview(req.params.id, req.params.reviewId, {
            ...reviewInput,
            rating: Number(reviewInput.rating),
        });
        if (!updated) {
            return res.status(404).send('Producto o reseña no encontrada.');
        }
        res.render('saved_review', { productId: req.params.id });
    } catch (error) {
        next(error);
    }
});

router.post('/product/:id/review/:reviewId/delete', async (req, res, next) => {
    try {
        const deleted = await deleteReview(req.params.id, req.params.reviewId);
        if (!deleted) {
            return res.status(404).send('Producto o reseña no encontrada.');
        }
        res.render('deleted_review', { productId: req.params.id });
    } catch (error) {
        next(error);
    }
});

router.post('/product/:id/review/new', async (req, res, next) => {
    try {
        const product = await getProduct(req.params.id);
        if (!product) {
            return res.status(404).send('Producto no encontrado.');
        }

        const body = req.body || {};
        const newReview = {
            author: typeof body.author === 'string' ? body.author : '',
            date: typeof body.date === 'string' ? body.date : '',
            rating: typeof body.rating === 'string' ? body.rating : '',
            comment: typeof body.comment === 'string' ? body.comment : '',
        };
        const errors = validateReview(newReview);
        if (errors.length > 0) {
            return res.status(400).render('detail', {
                product,
                errors,
                newReview,
                ratingOptions: getRatingOptions(newReview.rating),
                today: getToday(),
            });
        }

        const savedReview = await addReview(req.params.id, {
            ...newReview,
            rating: Number(newReview.rating),
        });
        if (!savedReview) {
            return res.status(404).send('Producto no encontrado.');
        }
        res.render('saved_review', { productId: req.params.id });
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const requestedPage = Number.parseInt(req.query.page, 10);
        const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
        const category = typeof req.query.category === 'string' ? req.query.category : '';

        const { products, totalPages } = await getProducts({ page, search, category });
        const productsView = products.map((product) => ({
            ...product,
            priceText: Number(product.price).toFixed(2),
        }));
        const extra = (search ? `&search=${encodeURIComponent(search)}` : '')
            + (category ? `&category=${encodeURIComponent(category)}` : '');
        const pages = Array.from({ length: totalPages }, (_, index) => {
            const number = index + 1;
            return { number, current: number === page };
        });

        res.render('index', {
            products: productsView,
            search,
            category,
            hasProducts: products.length > 0,
            currentPage: page,
            totalPages,
            pages,
            hasPrev: page > 1,
            hasNext: page < totalPages,
            prev: page - 1,
            next: page + 1,
            extra,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
