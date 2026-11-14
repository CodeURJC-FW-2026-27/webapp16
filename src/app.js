import express from 'express';
import mustacheExpress from 'mustache-express';
import { connectDatabase, getProductsCollection } from './database.js';
import { loadInitialData } from './load_data.js';

const app = express();


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/uploads', express.static('./uploads'));

// Ruta principal: obtiene los productos de MongoDB y los pasa a index.html
app.get('/', async (req, res) => {
    const products = await getProductsCollection().find().toArray();
    res.render('index', { products });
});

connectDatabase()
    .then(() => loadInitialData())
    .then(() => {
        app.listen(3000, () => {
            console.log(`Servidor listo en http://localhost:3000/`);
        });
    });