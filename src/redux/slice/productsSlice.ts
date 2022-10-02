import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';
import { IResponse } from '../../services/typings';

interface AddCategory {
    $id: string;
    categoriesId: null;
    categoriesName: string;
    description: null;
    imageName: null;
    productsId: string;
}

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
                $values: [...dataCopy]
            };
        },

        deleteProductById: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                $values: state.$values.filter((p) => p.productsId !== action.payload)
            };
        },

        addProductCategory: (state, action: PayloadAction<AddCategory>) => {
            const dataCopy = [...state.$values];
            const productIndex = dataCopy.findIndex((p) => p.productsId === action.payload.productsId);
            const categories = dataCopy[productIndex].categoriesDto?.$values;
            const allCategories = categories !== undefined ? [...categories, action.payload] : [];
            const productUpdate = { ...dataCopy[productIndex], categoriesDto: { allCategories, $id: '' } };
            dataCopy.splice(productIndex, 1, productUpdate);
            return {
                ...state,
                $values: [...dataCopy]
            };
        },

        removeCategory: (state, action) => {}
    }
});

export const { getProducts, updateOneProduct, deleteProductById, addProductCategory } = productsSlice.actions;

export default productsSlice.reducer;
