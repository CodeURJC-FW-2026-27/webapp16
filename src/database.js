import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
let db;

export async function connectDatabase() {
    try {
        await client.connect();
        db = client.db('bull-and-pear');
        console.log('Conectado correctamente a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

// Función para obtener la colección de productos
export function getProductsCollection() {
    return db.collection('products');
}

function getObjectId(id) {
    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
        return null;
    }
    return new ObjectId(id);
}

export async function getProduct(id) {
    const productId = getObjectId(id);
    if (!productId) {
        return null;
    }
    return getProductsCollection().findOne({ _id: productId });
}

export async function findProductByName(name, excludedId = '') {
    const query = { product: name };
    const productId = getObjectId(excludedId);
    if (productId) {
        query._id = { $ne: productId };
    }
    return getProductsCollection().findOne(query);
}

export async function addReview(productId, review) {
    const objectId = getObjectId(productId);
    if (!objectId) {
        return null;
    }

    const newReview = { ...review, _id: new ObjectId() };
    const result = await getProductsCollection().updateOne(
        { _id: objectId },
        { $push: { reviews: newReview } },
    );
    return result.matchedCount === 1 ? newReview : null;
}

export async function getReview(productId, reviewId) {
    const productObjectId = getObjectId(productId);
    const reviewObjectId = getObjectId(reviewId);
    if (!productObjectId || !reviewObjectId) {
        return null;
    }

    const product = await getProductsCollection().findOne(
        { _id: productObjectId, 'reviews._id': reviewObjectId },
        { projection: { reviews: { $elemMatch: { _id: reviewObjectId } } } },
    );
    return product && product.reviews.length > 0 ? product.reviews[0] : null;
}

export async function updateReview(productId, reviewId, review) {
    const productObjectId = getObjectId(productId);
    const reviewObjectId = getObjectId(reviewId);
    if (!productObjectId || !reviewObjectId) {
        return false;
    }

    const fields = {};
    for (const field of ['author', 'date', 'rating', 'comment']) {
        if (Object.prototype.hasOwnProperty.call(review, field)) {
            fields[`reviews.$.${field}`] = review[field];
        }
    }
    if (Object.keys(fields).length === 0) {
        return false;
    }

    const result = await getProductsCollection().updateOne(
        { _id: productObjectId, 'reviews._id': reviewObjectId },
        { $set: fields },
    );
    return result.matchedCount === 1;
}

export async function deleteReview(productId, reviewId) {
    const productObjectId = getObjectId(productId);
    const reviewObjectId = getObjectId(reviewId);
    if (!productObjectId || !reviewObjectId) {
        return false;
    }

    const result = await getProductsCollection().updateOne(
        { _id: productObjectId },
        { $pull: { reviews: { _id: reviewObjectId } } },
    );
    return result.modifiedCount === 1;
}

//Catálogo: paginación, búsqueda y categorías
const PAGE_SIZE = 6;
const NAME_FIELD = 'product';
const CATEGORY_FIELD = 'gender';

export async function getProducts({ page = 1, search = '', category = '' } = {}) {
    const query = {};
    if (search) {
        const safe = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapar caracteres especiales
        query[NAME_FIELD] = { $regex: safe, $options: 'i' };
    }
    if (category) {
        query[CATEGORY_FIELD] = category;
    }
    const collection = getProductsCollection();
    const total = await collection.countDocuments(query);
    const products = await collection
        .find(query)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .toArray();
    return { products, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}
