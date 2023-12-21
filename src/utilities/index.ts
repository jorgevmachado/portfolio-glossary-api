export default class StringUtils {
    public static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    public static slug(str: string) {
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
    public static currencyFormat(amount: number, { locale = 'pt-BR', currency = 'BRL' } = {}) {
        return Intl
            .NumberFormat(locale, { style: 'currency', currency })
            .format(amount)
            .replace(String.fromCharCode(160), String.fromCharCode(32));
    }

    public static generateOrder(url: string, urlDefault: string): number {
        return Number(url
            .replace(urlDefault, '')
            .replace('/', ''));
    }

    public static generateListOrder(urls: Array<string>, urlDefault: string): Array<number> | undefined {
        const list = urls.map((url) => StringUtils.generateOrder(url, urlDefault));
        return !list.length ? undefined : list;
    }

}
