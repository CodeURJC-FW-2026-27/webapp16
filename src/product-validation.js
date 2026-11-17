import { findProductByName } from './database.js';

export const PRODUCT_GENDERS = ['Hombre', 'Mujer', 'Unisex'];
export const PRODUCT_TYPES = [
    'Pantalón', 'Camiseta', 'Chaqueta', 'Bañador', 'Calzado',
    'Sudadera', 'Gorro', 'Bufanda', 'Calcetines',
];
export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export async function validateProduct(product, excludedId = '') {
    const errors = [];

    if (typeof product.product !== 'string' || product.product.trim() === '') {
        errors.push('El nombre del producto es obligatorio.');
    } else {
        const name = product.product.trim();
        if (name.length > 80) {
            errors.push('El nombre no puede superar los 80 caracteres.');
        }
        if (!/^[A-ZÁÉÍÓÚÜÑ]/.test(name)) {
            errors.push('El nombre debe comenzar con una letra mayúscula.');
        }
        if (name.length <= 80 && await findProductByName(name, excludedId)) {
            errors.push('Ya existe un producto con ese nombre.');
        }
    }

    // Check the format before conversion: Number('') would otherwise be zero.
    const price = product.price;
    const validPriceFormat = (typeof price === 'string' || typeof price === 'number')
        && /^\d+(\.\d{1,2})?$/.test(String(price));
    if (!validPriceFormat || !Number.isFinite(Number(price))
        || Number(price) < 0 || Number(price) > 100000) {
        errors.push('El precio debe estar entre 0 y 100000, con un máximo de dos decimales.');
    }

    if (!PRODUCT_GENDERS.includes(product.gender)) {
        errors.push('Selecciona un género válido: Hombre, Mujer o Unisex.');
    }
    if (!PRODUCT_TYPES.includes(product.productType)) {
        errors.push('Selecciona un tipo de producto válido.');
    }
    if (typeof product.colour !== 'string' || product.colour.trim() === ''
        || product.colour.trim().length > 80) {
        errors.push('El color es obligatorio y no puede superar los 80 caracteres.');
    }

    if (!Array.isArray(product.sizes) || product.sizes.length === 0
        || !product.sizes.every(size => PRODUCT_SIZES.includes(size))) {
        errors.push('Selecciona al menos una talla válida: XS, S, M, L o XL.');
    }

    if (typeof product.comment !== 'string' || product.comment.trim().length < 10
        || product.comment.trim().length > 1000) {
        errors.push('La descripción debe tener entre 10 y 1000 caracteres.');
    }
    if (typeof product.materials !== 'string' || product.materials.trim() === ''
        || product.materials.trim().length > 1000) {
        errors.push('Los materiales son obligatorios y no pueden superar los 1000 caracteres.');
    }

    return errors;
}
