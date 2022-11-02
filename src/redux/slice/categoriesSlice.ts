import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Categories } from '../../models/categories.model';
import { IResponse } from '../../services/typings';

export interface AddCategory {
    $id: string;
    categoriesId: string;
    categoriesName: string;
    description?: string;
    imageName?: string;
    productsId: string;
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {} as IResponse<Categories>,
    reducers: {
        getCategories: (state, action: PayloadAction<Categories>) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { getCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
