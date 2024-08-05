import { CartState } from "../network/redux/reducers/cartSlice";

export enum BOTW {
  name = "Brand of the Week",
}

export interface ResponseDataProducts {
  products: Products;
  successStatus: true;
}

export interface ResponseDataCategories {
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
  products: Products;
}

export interface User {
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

export interface Sort {
  state: boolean;
  order: string;
}

export type CartProduct = {
  cartProductId: string;
  quantity: number;
};

export interface Order {
  _id?: string;
  stripeID: string;
  userID: string;
  order: { product: Product; quantity: number; size: string }[];
  deliverStatus: boolean;
  total: number;
  time?: string;
}

export const valuta = "DKK";

export enum CategoryName {
  CATALOG = "catalog",
  BEST_SELLERS = "best-sellers",
  BOTW = "brand-of-the-week",
  DRESSES = "dresses",
  JACKETS = "jackets",
  PANTS = "pants",
  SKIRTS = "skirts",
  TOPS = "tops",
}
export const categoryIDString: Record<CategoryName, string> = {
  [CategoryName.CATALOG]: "",
  [CategoryName.BEST_SELLERS]: "",
  [CategoryName.BOTW]: "65f479d6d7cb797decefeea3",
  [CategoryName.DRESSES]: "65f479a2d7cb797decefee9e",
  [CategoryName.JACKETS]: "65f479cdd7cb797decefeea2",
  [CategoryName.PANTS]: "65f479c4d7cb797decefeea1",
  [CategoryName.SKIRTS]: "65f479abd7cb797decefee9f",
  [CategoryName.TOPS]: "65f47999d7cb797decefee9d",
};

export const reverseCategoryMap: { [key: string]: CategoryName } =
  Object.values(CategoryName).reduce((acc, value) => {
    acc[value] = value;
    return acc;
  }, {} as { [key: string]: CategoryName });
