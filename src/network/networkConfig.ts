




import axios from 'axios';
import { Product, Categories, ResponseDataProducts, User, Order } from '../utils/types';


/* const API_URL = 'http://localhost:8080/api/v1'; */
const API_URL = 'https://trendthread-server.onrender.com/api/v1';


export async function fetchAllProducts(page: number, limit: number, sortBy?: string, sortOrder?: string): Promise<ResponseDataProducts> {
    try {
        let url = `${API_URL}/products?page=${page}&pageSize=${limit}`;
        if (sortBy && sortOrder) {
            url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }
        const response = await axios.get<ResponseDataProducts>(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
export async function fetchNewProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>(`${API_URL}/products/new`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}
export async function fetchAllFilterOptions(field: string): Promise<string[]> {
    try {
        const response = await axios.get<string[]>(`${API_URL}/products/filteropt/${field}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching filter options for ${field}:`, error);
        throw error;
    }
}

export async function fetchPopularProducts(page: number, limit: number, sortBy?: string, sortOrder?: string): Promise<ResponseDataProducts> {
    try {
        let url = `${API_URL}/products/popular?page=${page}&pageSize=${limit}`;
        if (sortBy && sortOrder) {
            url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }
        const response = await axios.get<ResponseDataProducts>(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function fetchProductByID(id: string): Promise<Product> {
    try {
        const response = await axios.get<Product>(`${API_URL}/products/${id}`);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}

export async function fetchProductByName(name: string): Promise<Product> {
    try {
        const response = await axios.get<Product>(`${API_URL}/products/`, {
            params: {
                name: name
            }
        });

        
        return response.data;
    } catch (error) {
        console.error('Error fetching product by name:', error);
        throw error;
    }
}

export async function fetchSearchProducts(page: number, limit: number, query: string | null): Promise<ResponseDataProducts> {
    try {
        let url = `${API_URL}/products/search/${query}?page=${page}&pageSize=${limit}`;
        
        
        const response = await axios.get<ResponseDataProducts>(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function fetchAllCategories(): Promise<Categories[]> {
    try {
        const response = await axios.get<Categories[]>(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to handle it in the caller if needed
    }
}


export async function fetchCategory(id: string | null, page: number, limit: number, sortBy?: string, sortOrder?: string): Promise<Categories> {
    try {
        let url = `${API_URL}/categories/${id}?page=${page}&pageSize=${limit}`

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
        const response = await axios.get<{ id: string }>(`${API_URL}/categories`, {
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

export async function registerUser(firstName: string, lastName:string, email:string, password: string, favs: Product[]){
    try {
        const response = await axios.post(`${API_URL}/users/register`, {
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
        const response = await axios.post(`${API_URL}/users/login`, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;
        
        
        
        
        return data
    } catch (error) {
        console.error(error);
    }
}
 export async function manageFavourites(userId: string, productId: string): Promise<void> {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/manageFavourites`, { productId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
    } catch (error) {
        console.error("Error managing favourites:", error);
        throw error;
    }
} 

export async function editUserInfoByID(id: string, updates: Partial<User>): Promise<void> {
    try {
        const response = await axios.patch(`${API_URL}/users/${id}/edit`, updates, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
    } catch (error) {
        console.error("Error editing user information:", error);
        throw error;
    }
}


 export async function fetchUserFavorites(userId: string) {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/favourites`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
    }
} 


export async function logoutUser() {
    try {
        const response = await axios.get(`${API_URL}/users/logout`, {
            withCredentials: true, 
        });
        
        
        
        return response.data; 
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
}


export async function createCheckoutUser(
    items: {
        product: Product;
        quantity: number;
        size: string;
    }[],
    currency: string,
    customerEmail: string,
    name: string,
    customerID: any,
) {
    try {
        const response = await fetch(`${API_URL}/checkout/create-payment-intent/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items, 
                currency, 
                customerID,
                customerEmail,
                name,
            })
            
        });
        
        return response; 
    } catch (error) {
        console.error("STRIPE ERROR:", error);
        throw error;
    }
}


export async function createCheckoutGuest(
    items: {
        product: Product;
        quantity: number;
        size: string;
    }[],
    currency: string,
    customerEmail: string,
) {
    try {
        const response = await fetch(`${API_URL}/checkout/create-payment-intent/guest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items, 
                currency, 
                customerEmail,
            })
            
        });
        
        return response; 
    } catch (error) {
        console.error("STRIPE ERROR:", error);
        throw error;
    }
}


export async function configStripe(): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/checkout/config`);
        
        return response;
    } catch (error) {
        console.error("STRIPE CONFIG ERROR:", error);
        throw error;
    }
}

export async function addUserOrder(order: Order, userID: string): Promise<any>{
    try {
        const response = await axios.post(`${API_URL}/orders/user/${userID}`,{
            userID,
            order
        });
        
        console.log('Order added successfully:', response.data);
    } catch (error) {
        console.error('Error adding order:', error);
        
    }
}


export async function addGuestOrder(order: Order): Promise<any>{
    try {
        const response = await axios.post(`${API_URL}/orders/guest`,{
            order
        });
        
        console.log('Order added successfully:', response.data);
    } catch (error) {
        console.error('Error adding order:', error);
        
    }
}

export async function fetchUserOrders(userId: string) {
    try {
        const response = await axios.get(`${API_URL}/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
}


export async function fetchRecentOrder(userID: string, stripeID: string) {
    try {
        const response = await axios.get(`${API_URL}/users/${userID}/orders/${stripeID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
}

export async function fetchCountryInfo(country: string) {
    try {
        const response = await axios.get(`${API_URL}/country-info/country?=${country}`,{
            params: {
                country: country
            }
        })
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching country info:', error);
        throw error;
    }
}

