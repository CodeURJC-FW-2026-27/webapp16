import multer from 'multer';
import { mkdirSync } from 'node:fs';

export const UPLOADS_FOLDER = './uploads';

// Create the folder if it does not exist yet.
mkdirSync(UPLOADS_FOLDER, { recursive: true });

export const upload = multer({ dest: UPLOADS_FOLDER });
