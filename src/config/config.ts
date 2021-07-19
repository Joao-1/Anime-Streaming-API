import 'dotenv/config';
import multer from 'multer';
import path from 'path';

export default {
    app: {
        port: process.env.PORT || 3000,
        running: process.env.RUNNING,
    },
    database: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
        port: 5432,
    },
    request: {
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 150,
        },
        slowDown: {
            windowMs: 15 * 60 * 1000,
            delayAfter: 100,
            delayMs: 100,
        },
    },
    cors: {
        origin: '*',
        allowedHeaders: 'Content-Type, X-Request-With, Accept, Authorization',
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    },

    files: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, `${process.cwd()}/uploads`);
        },
        filename(req, file, cb) {
            cb(null, file.originalname + Date.now() + path.extname(file.originalname));
        },
    }),
};
