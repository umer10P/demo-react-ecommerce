export interface ProductsState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

export interface BasketItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
export interface Product {
    id: number;
    name: string;
    price: number;
  }
  
export interface BasketState {
    items: BasketItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    addItemStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  }
  
  