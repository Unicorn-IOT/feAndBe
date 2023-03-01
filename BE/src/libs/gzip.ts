import { gzipSync } from 'zlib';

export const supports = (acceptEncoding?: string) => acceptEncoding && !!~acceptEncoding.indexOf('gzip');

export const compress = (data: string) => gzipSync(data).toString('base64');
