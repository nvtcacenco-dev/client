import { Product } from "../../utils/types";

export interface ItemBrowserProps{
    products: Product[];
    favStatus?: boolean;
    priceFilter?: boolean;
}