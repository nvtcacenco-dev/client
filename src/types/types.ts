export enum BOTW{
    name = "Ida Sjostedt"
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
}

export interface Categories {
    _id: string;
    Name: string;
    products: Products
}