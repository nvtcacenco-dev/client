import { Theme } from "@mui/material";
import { Categories, Product } from "../../utils/types";

export interface NavBarSectionProps{
    cart:  {
        product: Product;
        quantity: number;
        size: string;
    }[];
    isUser: boolean;
    outerTheme: Theme;
    searchBarName: string;
    searchSuggestionName: string;
    searchResultMap: JSX.Element[];
    favs: Product[];
    accountButtonPath: string;
    isFocused: boolean;
    categories: Categories[] | undefined;
    isLoading: boolean;
    urlEndpoint: string;
    setSearchQuery: (value: React.SetStateAction<string>) => void;
    setSearchFocus: (value: React.SetStateAction<boolean>) => void;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    handleSearch: () => void;
}



export interface CustomSearchProps{
    
    outerTheme: Theme;
    searchBarName: string;
    searchSuggestionName: string;
    searchResultMap: JSX.Element[];
    isFocused: boolean;
    setSearchQuery: (value: React.SetStateAction<string>) => void;
    setSearchFocus: (value: React.SetStateAction<boolean>) => void;
    isDesktop: boolean;
    handleSearch: () => void;
    
}


