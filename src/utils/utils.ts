import { CategoryName, Product, categoryIDString, reverseCategoryMap } from "./types";
import { createTheme, Theme} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';


type CountryInfo = {
    alpha2Code: string;
    currencyCode: string;
};

type CountryInfoMap = {
    [country: string]: CountryInfo;
};

const countryInfoMap: CountryInfoMap = {
    "Denmark": { alpha2Code: "DK", currencyCode: "DKK" },
    "United States": { alpha2Code: "US", currencyCode: "USD" },
    "China": { alpha2Code: "CN", currencyCode: "CNY" },
    "India": { alpha2Code: "IN", currencyCode: "INR" },
    "Brazil": { alpha2Code: "BR", currencyCode: "BRL" },
    "Russia": { alpha2Code: "RU", currencyCode: "RUB" },
    "Germany": { alpha2Code: "DE", currencyCode: "EUR" },
    "United Kingdom": { alpha2Code: "GB", currencyCode: "GBP" },
    "France": { alpha2Code: "FR", currencyCode: "EUR" },
    "Italy": { alpha2Code: "IT", currencyCode: "EUR" },
    "Canada": { alpha2Code: "CA", currencyCode: "CAD" },
    "Japan": { alpha2Code: "JP", currencyCode: "JPY" },
    "South Korea": { alpha2Code: "KR", currencyCode: "KRW" },
    "Australia": { alpha2Code: "AU", currencyCode: "AUD" },
    "Spain": { alpha2Code: "ES", currencyCode: "EUR" },
    "Mexico": { alpha2Code: "MX", currencyCode: "MXN" },
    "Indonesia": { alpha2Code: "ID", currencyCode: "IDR" },
    "Netherlands": { alpha2Code: "NL", currencyCode: "EUR" },
    "Saudi Arabia": { alpha2Code: "SA", currencyCode: "SAR" },
    "Turkey": { alpha2Code: "TR", currencyCode: "TRY" }
};

export function getCountryInfo(countryName: string): CountryInfo{
    return countryInfoMap[countryName];
}



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

export function getEnumFromUrlPart(urlPart: string): CategoryName {
    return reverseCategoryMap[urlPart];
}

export function getIdFromUrl(url: string): string  {
    const lastPart = getLastPartOfUrl(url);
    const categoryEnum = getEnumFromUrlPart(lastPart);
    if (categoryEnum) {
        return categoryIDString[categoryEnum];
    }
    return '';
}

export function handleHyphens(name: string): string {
    return name.replace(/ /g, "-").toLowerCase();
}

export function replaceHyphensWithSpace(url: string) {
   
    return url.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    

}


export function removeBackslash(inputString: string) {
    // Replace backslashes with an empty string
    let cleanedString = inputString.replace(/\//g, '');
    cleanedString = cleanedString.replace(/\b\w/g, char => char.toUpperCase());
    return cleanedString;
}



export function getStringAfterAmpersand(id: string) {
    // Find the index of the first occurrence of '&'
    const index = id.indexOf('&');

    // If '&' is found, return the substring after '&', otherwise return an empty string
    return index !== -1 ? id.slice(index + 1) : '';
}


export function removeAmpersandAndAfter(inputString: string) {
    // Find the index of the first occurrence of '&'
    const index = inputString.indexOf('&');

    // If '&' is found, return the substring before '&', otherwise return the original string
    return index !== -1 ? inputString.slice(0, index) : inputString;
}


export function calcCartSize(cart:{
    product: Product;
    quantity: number;
    size: string;
}[] ): number {
    let count = 0;

    cart.forEach(function (item) {
        count += item.quantity;
    })


    return count;
}

export function quantityCheck(quantity: number): boolean{
    if(quantity > 1 ){
        return false
    }else{
        return true
    }
}

export const extractDateFromObjectId = (objectId: string) => {
    // The first 8 characters of the ObjectId represent the timestamp in hexadecimal
    const timestampHex = objectId.substring(0, 8);

    // Convert the hexadecimal timestamp to a decimal number
    const timestamp = parseInt(timestampHex, 16);

    // Create a Date object from the Unix timestamp (multiply by 1000 to convert seconds to milliseconds)
    const date = new Date(timestamp * 1000);

    // Format the date as a string (e.g., 'YYYY-MM-DD')
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

export const customInputThemeCheckout = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {

                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': 'var(--primary-clr-600)',
                        '--TextField-brandBorderFocusedColor': 'var(--primary-clr-600)',
                        '& label.Mui-focused': {
                            color: 'var(--dark-clr)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        color: 'var(--dark-clr)',
                        fontFamily: 'Poppins !important',
                        fontSize: 'var(--fs-sm)',
                        borderRadius: '0px',
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: 'var(--fs-sm)',
                    }
                }
            },
            MuiInput: {
                styleOverrides: {
                    root: {

                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });