import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);

export async function uploadFile(file, path) {
    const filePath = `${path}${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
}