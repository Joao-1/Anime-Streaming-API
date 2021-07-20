import fs from 'fs';
import util from 'util';
import ApiError from './ApiError';

const rename = util.promisify(fs.rename);

export default async function moveFiles(oldPath: string, newPath: string) {
    try {
        await rename(oldPath, newPath);
    } catch (error) {
        throw new ApiError('error renaming image', 500);
    }
}
