import express from 'express';
import { getProducts } from './database.js';

const router = express.Router();

// Ruta principal: catálogo con paginación, búsqueda y categorías
router.get('/', async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const search = (req.query.search || '').trim();
    const category = req.query.category || '';
    
    const { products, totalPages } = await getProducts({ page, search, category });

    // Preparamos el precio con 2 decimales para Mustache
    const productsView = products.map(p => ({ ...p, priceText: p.price.toFixed(2) }));

    // Para conservar búsqueda y categoría al cambiar de página en la paginación
    const extra = (search ? `&search=${encodeURIComponent(search)}` : '') +
                  (category ? `&category=${encodeURIComponent(category)}` : '');

    res.render('index', {
        products: productsView,
        search,
        category,
        hasProducts: products.length > 0,
        currentPage: page,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
        prev: page - 1,
        next: page + 1,
        extra
    });
});

export default router;