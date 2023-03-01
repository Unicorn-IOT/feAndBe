import { brotliCompressSync, brotliDecompressSync } from 'zlib';

export const supports = (acceptEncoding?: string) => acceptEncoding && !!~acceptEncoding.indexOf('br');

export const compress = (data: string) => brotliCompressSync(data).toString('base64');

export const decompress = (base64: string) => brotliDecompressSync(Buffer.from(base64, 'base64')).toString('utf-8');
