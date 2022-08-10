import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';
import { IResponse } from '../../services/typings';

const productSlice = createSlice({
    name: 'product',
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

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
