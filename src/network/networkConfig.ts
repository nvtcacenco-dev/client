import axios from 'axios';

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
}

export interface Categories {
    _id: string;
    Name: string;
    Products: Product[]  
}

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>('http://localhost:8080/api/v1/products');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}

export async function fetchNewProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>('http://localhost:8080/api/v1/products/new');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}

export async function fetchAllCategories(): Promise<Categories[]> {
    try {
        const response = await axios.get<Categories[]>('http://localhost:8080/api/v1/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}


export async function fetchCategory(id: string): Promise<Categories[]> {
    try {
        const response = await axios.get<Categories[]>(`http://localhost:8080/api/v1/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}
