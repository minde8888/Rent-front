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
        }
    }
});

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;
