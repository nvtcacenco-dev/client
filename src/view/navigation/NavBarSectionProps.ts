import { Theme } from "@mui/material";
import { Categories, Product } from "../../utils/types";

export interface NavBarSectionProps{
    cart:  {
        product: Product;
        quantity: number;
        size: string;
    }[];
    
    outerTheme: Theme;
    searchBarName: string;
    searchSuggestionName: string;
    favs: Product[];
    accountButtonPath: string;
    isFocused: boolean;
    isLoading: boolean;
    setSearchFocus: (value: React.SetStateAction<boolean>) => void;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    
}



export interface CustomSearchProps{
    outerTheme: Theme;
    searchBarName: string;
    searchSuggestionName: string;
    isFocused: boolean;
    isDesktop: boolean;
    setSearchFocus: (value: React.SetStateAction<boolean>) => void;
}


