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