import { CartState } from "../network/redux/reducers/cartSlice";

export enum BOTW{
    name = "Brand of the Week"
}



export interface ResponseDataProducts{
    products: Products ;
    successStatus: true;
}

export interface ResponseDataCategories{
    successStatus: true;
    categories: Categories[];
}

export interface Products {
    data: Product[];
    metadata: MetaData;
}


export interface MetaData {
    totalCount: number;
    page: number;
    pageSize: number;
}


export interface Product {
    _id: string;
    Brand: string;
    Categories: string[];
    Color: string;
    Name: string;
    Price: number;
    Size: string[];
    imageURL: string;
    newStatus: boolean;
    imgsNr: number;
    Popularity: number;
    Discount: number;
    blurHash: string[];
}


export interface Categories {
    _id: string;
    Name: string;
    products: Products
}

export interface User{
    firstName: string;
    lastName: string;
    email: string;
    cart: CartState;
    favourites: Product[];
    address: string;
    city: string;
    zipCode: string;
    orders: Order[] | Order;
}


export interface Sort{
    state: boolean;
    order: string;
}

export type CartProduct = {
    cartProductId: string;
    quantity: number;
}

export interface Order{
    stripeID: string;
    order: {product: Product, quantity: number, size: string}[];
    deliverStatus: boolean;
}

export const valuta = 'DKK'
    
