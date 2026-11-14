import express from 'express';
import mustacheExpress from 'mustache-express';
import { connectDatabase } from './database.js';
import { loadInitialData } from './load_data.js';
const app = express();


// 1. Configuración del motor de plantillas Mustache
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');

// 2. Middleware para procesar los datos de los formularios (POST)
app.use(express.urlencoded({ extended: true }));

// 3. Configuración de carpetas estáticas (CSS, JS, imágenes y la carpeta uploads)
app.use(express.static('./public'));
app.use('/uploads', express.static('./uploads'));

// 4. Ruta de prueba temporal para comprobar que todo funciona
app.get('/', (req, res) => {
    res.render('index');
});

// 5. Conectar a la base de datos y arrancar el servidor web
connectDatabase()
.then(() => loadInitialData())
.then(() => {
    app.listen(3000, () => {
        console.log(`Servidor listo en http://localhost:3000/`);
    });
});