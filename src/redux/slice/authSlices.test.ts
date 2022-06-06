import reducer, { AuthState } from './authSlice';

describe('authSlice', () => {
    test('returns initial state', () => {
        const result = reducer(undefined, { type: '' });
        expect(result).toEqual({ isLoggedIn: false });
    });

    // test('returns user is not logged in', () => {
    //     const initState = { isLoggedIn: true } as AuthState;
    //     const newState = reducer(initState, registerSuccess());
    //     expect(newState).toEqual({ isLoggedIn: false });
    // });
});
