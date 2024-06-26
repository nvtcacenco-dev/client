import { Product } from "./types";
import { createTheme, Theme} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

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
                        '--TextField-brandBorderHoverColor': 'var(--primary-clr-light-faded)',
                        '--TextField-brandBorderFocusedColor': 'var(--primary-clr-light-faded)',
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