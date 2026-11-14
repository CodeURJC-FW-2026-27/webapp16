import express from 'express';
import mustacheExpress from 'mustache-express';
import { connectDatabase } from './database.js';

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
    res.send('<html><body><h1>Servidor de Bull and Pear funcionando correctamente</h1></body></html>');
});

// 5. Conectar a la base de datos y arrancar el servidor web
connectDatabase().then(() => {
    app.listen(3000, () => {
        console.log(`Servidor listo en http://localhost:3000/`);
    });
});