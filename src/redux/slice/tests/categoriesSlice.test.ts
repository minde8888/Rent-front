import { IResponse } from '../../../services/typings';
import { Categories } from '../../../models/categories.model';
import reducer, { getCategories } from '../categoriesSlice';

describe('categoriesSlice', () => {
    test('returns all categories', () => {
        const initialState = {} as IResponse<Categories>;
        const newState = reducer(initialState, getCategories(response));
        expect(newState).toEqual({ ...newState, ...response });
    });
});

const response = {
    $id: '',
    categoriesId: '',
    categoriesName: '',
    description: '',
    imageName: '',
    productsId: ''
};
