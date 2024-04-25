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
    Price: string;
    Size: string[];
    imageURL: string;
    newStatus: boolean;
    imgsNr: number;
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
}