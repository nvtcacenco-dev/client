




import axios from 'axios';
import { Product, Categories, ResponseDataProducts } from '../utils/types';


export async function fetchAllProducts(page: number, limit: number, sortBy?: string, sortOrder?: string): Promise<ResponseDataProducts> {
    try {
        let url = `http://localhost:8080/api/v1/products?page=${page}&pageSize=${limit}`;
        if (sortBy && sortOrder) {
            url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }
        const response = await axios.get<ResponseDataProducts>(url);
        console.log(response);
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
export async function fetchAllFilterOptions(field: string): Promise<string[]> {
    try {
        const response = await axios.get<string[]>(`http://localhost:8080/api/v1/products/filteropt/${field}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching filter options for ${field}:`, error);
        throw error;
    }
}

export async function fetchPopularProducts(page: number, limit: number, sortBy?: string, sortOrder?: string): Promise<ResponseDataProducts> {
    try {
        let url = `http://localhost:8080/api/v1/products/popular?page=${page}&pageSize=${limit}`;
        if (sortBy && sortOrder) {
            url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }
        const response = await axios.get<ResponseDataProducts>(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function fetchProductByID(id: string): Promise<Product> {
    try {
        const response = await axios.get<Product>(`http://localhost:8080/api/v1/products/${id}`);
        
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


export async function fetchCategory(id: string | null, page: number, limit: number, sortBy?: string, sortOrder?: string): Promise<Categories> {
    try {
        let url = `http://localhost:8080/api/v1/categories/${id}?page=${page}&pageSize=${limit}`

        if (sortBy && sortOrder) {
            url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }
        const response = await axios.get<Categories>(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}



export const getCategoryIDByName = async (name: string): Promise<string | null> => {
    try {
        const response = await axios.get<{ id: string }>('http://localhost:8080/api/v1/categories', {
            params: {
                name: name
            }
        });

        console.log(response);
        return response.data.id;
    } catch (error) {
        console.error('Error fetching category ID:', error);
        return null;
    }
};

export async function registerUser(firstName: string, lastName:string, email:string, password: string, favs: Product[]){
    try {
        const response = await axios.post('http://localhost:8080/api/v1/users/register', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          favourites: favs,
          
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
       
        return response;
      } catch (error) {
        
        console.error(error);
        return error;
      }
}

export async function authUser(email: string, password: string) {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/users/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;
        console.log(data)
        
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function manageFavourites(userId: string, productId: string): Promise<void> {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/users/${userId}/manageFavourites`, { productId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.message);
    } catch (error) {
        console.error("Error managing favourites:", error);
        throw error;
    }
}

export async function fetchUserFavorites(userId: string) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}/favourites`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
    }
}


export async function logoutUser() {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/users/logout', {
            withCredentials: true, 
        });
        
        console.log(response.data.message);
        
        return response.data; 
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
}

