import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';
import { IResponse } from '../../services/typings';

const productsSlice = createSlice({
    name: 'products',
    initialState: {} as IResponse<Product>,
    reducers: {
        getProducts: (state, action: PayloadAction<IResponse<Product>>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        updateOneProduct: (state, action: PayloadAction<IResponse<Product>>) => {
            const dataCopy = [...state.$values];
            const productIndex = dataCopy.findIndex((p) => p.productsId === action.payload.$values[0].productsId);
            const product = dataCopy[productIndex];
            const updatedProduct = { ...product, ...action.payload };
            dataCopy.splice(productIndex, 1, updatedProduct);
            return {
                ...state,
                $values: dataCopy
            };
        },
        deleteProductById: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                $values: state.$values.filter((p) => p.productsId !== action.payload)
            };
        }
    }
});

export const { getProducts, updateOneProduct, deleteProductById } = productsSlice.actions;

export default productsSlice.reducer;
