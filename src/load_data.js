import fs from 'fs/promises';
import { ObjectId } from 'mongodb';
import { getProductsCollection } from './database.js';

export async function loadInitialData() {
    try {
        const productsCollection = getProductsCollection();
        const count = await productsCollection.countDocuments();

        if (count === 0) {
            const rawData = await fs.readFile('./data/products.json', 'utf-8');
            const products = JSON.parse(rawData);
            for (const product of products) {
                for (const review of product.reviews) {
                    review._id = new ObjectId(review._id);
                }
            }

            await productsCollection.insertMany(products);
            console.log(`Carga inicial completada: ${products.length} productos insertados en MongoDB.`);
        } else {
            console.log(`La base de datos ya contiene ${count} productos. No se requiere carga inicial.`);
        }
    } catch (error) {
        console.error('Error durante la carga inicial de datos:', error);
    }
}