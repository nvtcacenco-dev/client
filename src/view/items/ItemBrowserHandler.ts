import { Product } from "../../types/types";

export interface ItemBrowserProps{
    products: Product[];
    favStatus?: boolean;
}