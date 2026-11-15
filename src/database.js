import { MongoClient } from 'mongodb';

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