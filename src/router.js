import express from 'express';
import { getProduct, getProducts } from './database.js';

const router = express.Router();

router.get('/product/:id', async (req, res, next) => {
    try {
        const product = await getProduct(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found.');
        }
        res.render('detail', { product });
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