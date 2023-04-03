export interface Product {
    id: number;
    name: string;
    unit_price: number;
    stock: number;
    image: string;
    description?: string;
}