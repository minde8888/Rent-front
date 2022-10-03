import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product.model';
import { IResponse } from '../../services/typings';

interface AddCategory {
    $id: string;
    categoriesId: string;
    categoriesName: string;
    description: string;
    imageName: string;
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

        deleteProductById: (state, action: PayloadAction<{ id: string; productsId: string }>) => {
            const dataCopy = [...state.$values];
            const product = dataCopy.filter((p) => p.productsId === action.payload.productsId);
            const removedCategory = product.map((e) => e.categoriesDto.$values.filter((c) => !action.payload.id.includes(c.categoriesId)));
            // product.filter
            // const newSate = dataCopy.map((p) => p.productsId === action.payload.productsId ?.filter((e) => !action.payload.includes(e.categoriesId)));
            return {
                ...state
                // $values: state.$values.filter((p) => p.categoriesDto.$values?.filter((e) => !action.payload.includes(e.categoriesId)))
            };
        },

        addProductCategory: (state, action: PayloadAction<AddCategory>) => {
            const dataCopy = [...state.$values];
            const productIndex = dataCopy.findIndex((p) => p.productsId === action.payload.productsId);
            const categories = dataCopy[productIndex].categoriesDto?.$values;
            const allCategories = categories !== undefined ? [...categories, action.payload] : [];
            const productUpdate = { ...dataCopy[productIndex], categoriesDto: { $values: [...allCategories], $id: '' } };
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
