import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/shop';
import api from '../../config/axios';
import { buyItems } from './cart';

interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
}

const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.fulfilled, (state, action: any) => {
                state.products = action.payload;
            })
            .addCase(fetchProductsById.fulfilled, (state, action: any) => {
                state.selectedProduct = action.payload;
            })
            .addCase(buyItems.fulfilled, (state, action: any) => {
                state.products = action.payload;
            })
    },
});

export const fetchProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try {
            const response = await api('/all-products');
            return response.data.products;
        } catch (error) {
            console.log("🚀 ~ file: products.ts:37 ~ error:", error)
        }

    }
)

export const fetchProductsById = createAsyncThunk(
    'products/getProductsById',
    async (id: number) => {
        try {
            const response = await api(`/detail/${id}`);
            return { ...response.data, id: id };
        } catch (error) {
            console.log("🚀 ~ file: products.ts:37 ~ error:", error)
        }
    }
)

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;