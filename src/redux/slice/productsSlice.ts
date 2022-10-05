import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatValues, Product } from '../../models/product.model';
import { IResponse } from '../../services/typings';

export interface AddCategory {
    $id: string;
    categoriesId: string;
    categoriesName: string;
    description?: string;
    imageName?: string;
    productsId: string;
}

interface UpdateCategories {
    category: CatValues[];
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
            const categories = dataCopy[productIndex]?.categoriesDto.$values;
            const productUpdate = { ...dataCopy[productIndex], categoriesDto: { $values: [...categories, action.payload], $id: '' } };
            dataCopy.splice(productIndex, 1, productUpdate);
            return {
                ...state,
                $values: [...dataCopy]
            };
        },
        updateProductCategory: (state, action: PayloadAction<UpdateCategories>) => {
            const dataCopy = [...state.$values];
            const productIndex = dataCopy.findIndex((p) => p.productsId === action.payload.productsId);
            const productUpdate = { ...dataCopy[productIndex], categoriesDto: { $values: [...action.payload.category], $id: '' } };
            console.log(productUpdate);

            dataCopy.splice(productIndex, 1, productUpdate);
            return {
                ...state,
                $values: [...dataCopy]
            };
        },

        deleteProductCategoryById: (state, action: PayloadAction<{ id: string; productsId: string }>) => {
            const dataCopy = [...state.$values];
            const productIndex = dataCopy.findIndex((p) => p.productsId === action.payload.productsId);
            const categoryIndex = dataCopy[productIndex]?.categoriesDto.$values.findIndex((c) => c.categoriesId === action.payload.id);
            const categories = dataCopy[productIndex]?.categoriesDto.$values.splice(categoryIndex, 1);
            const productUpdate = { ...dataCopy[productIndex], categoriesDto: { $values: [...categories], $id: '' } };
            dataCopy.splice(productIndex, 1, productUpdate);
        }
    }
});

export const { getProducts, updateOneProduct, deleteProductById, addProductCategory, updateProductCategory, deleteProductCategoryById } = productsSlice.actions;

export default productsSlice.reducer;
