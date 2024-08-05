import { createTheme } from "@mui/material/styles";
import { Product } from "../../utils/types";

export const customTheme = (outerTheme: { palette: { mode: any } }) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "var(--fs-base)",
            paddingLeft: "12px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "var(--primary-clr-600)",
            "--TextField-brandBorderHoverColor": "transparent",
            "--TextField-brandBorderFocusedColor":
              "var(--primary-clr-600)",
            "& label.Mui-focused": {
              color: "#6F7E8C",
            },
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: "36px",
            transition:
              "border-radius 0.3s 0.3s ease-in-out, background-color 0.3s ease-in-out",
            overflow: "hidden",
            paddingLeft: "12px",
            fontSize: "var(--fs-base)",
            backgroundColor: "#fdf6f7",
            border: "1px solid var(--primary-clr-600)",
            "&:hover": {
              backgroundColor: "var(--primary-clr-600)",
            },
            "&.Mui-focused": {
              backgroundColor: "var(--light-clr)",
              border: "1px solid var(--primary-clr-600)",
              borderRadius: "0px",
              transition:
                "border-radius 0.3s 0s ease-in-out, background-color 0.3s ease-in-out",
            },
            "&::before, &::after": {
              borderBottom: "0px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "0px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "0px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
  export const customThemeSm = (outerTheme: { palette: { mode: any } }) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiFormLabel: {
          styleOverrides: {
            root: {
              fontSize: "var(--fs-base)",
              paddingLeft: "12px",
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              "--TextField-brandBorderColor": "var(--primary-clr-600)",
              "--TextField-brandBorderHoverColor": "transparent",
              "--TextField-brandBorderFocusedColor":
                "var(--primary-clr-600)",
              "& label.Mui-focused": {
                color: "#6F7E8C",
              },
            },
          },
        },
  
        MuiFilledInput: {
          styleOverrides: {
            root: {
              borderRadius: "0px",
              transition:
                "border-radius 0.3s 0.3s ease-in-out, background-color 0.3s ease-in-out",
              overflow: "hidden",
              paddingLeft: "12px",
              fontSize: "var(--fs-base)",
              backgroundColor: "#fdf6f7",
              border: "1px solid var(--primary-clr-600)",
              "&:hover": {
                backgroundColor: "var(--primary-clr-600)",
              },
              "&.Mui-focused": {
                backgroundColor: "var(--light-clr)",
                border: "1px solid var(--primary-clr-600)",
                borderRadius: "0px",
                transition:
                  "border-radius 0.3s 0s ease-in-out, background-color 0.3s ease-in-out",
              },
              "&::before, &::after": {
                borderBottom: "0px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom: "0px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "0px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
      },
    });
export interface MatchedSubstring {
  substring: string;
  startIndex: number;
  endIndex: number;
}

export function findMatchedSubstrings(text: string, query: string): MatchedSubstring[] {
    const matchedSubstrings: MatchedSubstring[] = [];
    const words = text.split(/\s+/); // Split text into words using whitespace as delimiter

    words.forEach((word, index) => {
        if (word.toLowerCase().includes(query.toLowerCase())) {
            // If the word contains the search query, add it to the matched substrings
            matchedSubstrings.push({
                substring: word,
                startIndex: text.indexOf(word),
                endIndex: text.indexOf(word) + word.length - 1
            });
        }
    });

    return matchedSubstrings;
}


export function calcCartSize(cart: {
  product: Product;
  quantity: number;
  size: string;
}[]): number {
        
  let count = 0;

  cart.forEach(function (item) {
      count += item.quantity;
  })


  return count;
}


function handleFocus(overflow: string, padding: number) {
  document.body.style.overflowY = overflow;
  document.body.style.paddingRight = `${padding}px`;
  const navElement = document.getElementById('topNav');
  const bottomNavElement = document.getElementById('btmNav');
  const promoElement = document.getElementById('promo-banner');

  if (navElement) {
      navElement.style.width = `calc(100% - ${padding})`;
      
  }
  /* if (bottomNavElement) {
    bottomNavElement.style.width = `calc(100% - ${padding})`;
  }

  if (promoElement) {
      promoElement.style.width = `calc(100% - ${padding})`;
  }  */
}