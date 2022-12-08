import fetch from 'node-fetch';

export class FetchApi {
    public static async imageFetch(url: string): Promise<string> {
        const res = await fetch(url);
        if (res.ok) {
            const buffer: any = await res.buffer();
            const bs64 = buffer.toString('base64');
            return bs64;
        }
        return '';
    }
}


