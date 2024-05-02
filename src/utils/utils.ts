export function calculateDiscountedPrice(price: number, discount: number): number{
    const discountedPrice = price - (price*(discount/100))
    return discountedPrice;
}


export function getLastPartOfUrl(url: string) {
    try {
        const urlObj = new URL(url, window.location.origin);
        const parts = urlObj.pathname.split('/');
        return parts[parts.length - 1];
    } catch (error) {
        console.error('Error parsing URL:', error);
        return '';
    }
}

export function handleHyphens(name: string): string {
    return name.replace(/ /g, "-").toLowerCase();
}