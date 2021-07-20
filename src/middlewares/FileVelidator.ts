import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import config from '../config/config';

const storage = config.files;

export default function validateOneFile(fileName: string, fileType: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const upload = multer({ storage }).single(fileName);

        // eslint-disable-next-line consistent-return
        upload(req, res, () => {
            if (!req.file?.path) {
                return res.status(422).json({
                    status: 'failed',
                    error: {
                        details: {
                            message: 'file not found',
                            type: fileType,
                        },
                    },
                });
            }

            if (req.file?.mimetype !== fileType) {
                return res.status(422).json({
                    status: 'failed',
                    error: {
                        details: {
                            message: 'Unsupported file type',
                            type: fileType,
                        },
                    },
                });
            }
            next();
        });
    };
}
