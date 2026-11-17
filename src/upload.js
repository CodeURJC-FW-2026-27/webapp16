import multer from 'multer';
import { mkdirSync } from 'node:fs';

export const UPLOADS_FOLDER = './uploads';

// Create the folder if it does not exist yet.
mkdirSync(UPLOADS_FOLDER, { recursive: true });

export const upload = multer({
    dest: UPLOADS_FOLDER,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!imageTypes.includes(file.mimetype)) {
            return callback(new Error('Selecciona una imagen JPEG, PNG, WebP o GIF.'));
        }
        callback(null, true);
    },
});
