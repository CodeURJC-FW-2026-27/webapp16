import express from 'express';
import mustacheExpress from 'mustache-express';
import { connectDatabase } from './database.js';
import { loadInitialData } from './load_data.js';
import router from './router.js';

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/uploads', express.static('./uploads'));

app.use('/', router);

async function startServer() {
    try {
        await connectDatabase();
        await loadInitialData();
        app.listen(3000, () => {
            console.log(`Servidor listo en http://localhost:3000/`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

startServer();