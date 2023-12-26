export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function slug(str: string) {
    str = str.toLowerCase();
    str = str.replace(/a-zA-Z0-9_.-+/g, '');
    str = str.replace(/_/g, '');
    str = str.replace(/[^\w\s]/gi, '');
    str = str.replace(/( )+/g, '-');

    if (str.substring(str.length - 1, str.length) === '-') {
        return str.substring(0, str.length - 1);
    }

    return str;
}
export function currencyFormat(amount: number, { locale = 'pt-BR', currency = 'BRL' } = {}) {
    return Intl
        .NumberFormat(locale, { style: 'currency', currency })
        .format(amount)
        .replace(String.fromCharCode(160), String.fromCharCode(32));
}

export function generateOrder(url: string, urlDefault: string): number {
    return Number(url
        .replace(urlDefault, '')
        .replace('/', ''));
}

export function generateListOrder(urls: Array<string>, urlDefault: string): Array<number> | undefined {
    const list = urls.map((url) => generateOrder(url, urlDefault));
    return !list.length ? undefined : list;
}

export function fileImageUrl(host: string = 'http://localhost', port: string = '3000', path: string = ''): string {
    return `${host}:${port}/files/images/${path}`;
}
