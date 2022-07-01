import { User } from '../../../models/user.model';
import reducer from '../userSlice';
import { getUserProfile } from '../userSlice';
import { user } from './authSlices.test';

describe('userSlice', () => {
    test('returns user data', () => {
        const initialState = {} as User;
        const newState = reducer(initialState, getUserProfile(user));
        expect(newState).toEqual({ ...newState, ...user });
    });

    test('returns updated user data', () => {
        const initialState = {} as User;
        const newState = reducer(initialState, getUserProfile(userUpdate));
        // const addressDto = newState.addressDto;
        expect(newState).toEqual({ ...newState, ...userUpdate });
    });
});

const userUpdate = {
    $id: 'string',
    token: 'string',
    refreshToken: 'string',
    id: 'string',
    name: 'string',
    surname: 'string',
    phoneNumber: 'string',
    email: 'string',
    occupation: 'string',
    roles: 'string',
    imageName: 'string'
};
