




import axios from 'axios';
import { Product, Categories, ResponseDataProducts } from '../types/types';


export async function fetchAllProducts(page: number, limit: number): Promise<ResponseDataProducts> {
    try {
        const response = await axios.get<ResponseDataProducts>(`http://localhost:8080/api/v1/products?page=${page}&pageSize=${limit}`);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
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


export async function fetchCategory(id: string | null, page: number, limit: number): Promise<Categories> {
    try {
        const response = await axios.get<Categories>(`http://localhost:8080/api/v1/categories/${id}?page=${page}&pageSize=${limit}`);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}


export const getCategoryIDByName = async (name: string): Promise<string | null> => {
    try {
        const response = await axios.get<{ id: string }>('/api/v1/categories', {
            params: {
                name: name
            }
        });
        return response.data.id;
    } catch (error) {
        console.error('Error fetching category ID:', error);
        return null;
    }
};
