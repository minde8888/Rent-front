import reducer, { AuthState, changeRefreshToken, loginFail, loginSuccess, registerFail, userLogout } from './authSlice';

describe('authSlice', () => {
    test('returns initial state', () => {
        const result = reducer(undefined, { type: '' });
        expect(result).toEqual({ isLoggedIn: false });
    });
    test('returns user signup is fail', () => {
        const initState = { isLoggedIn: true } as AuthState;
        const newState = reducer(initState, registerFail('string'));
        expect(newState).toEqual({ isLoggedIn: false, error: 'string' });
    });

    test('returns user is logged', () => {
        const initState = { isLoggedIn: false } as AuthState;
        const newState = reducer(initState, loginSuccess(user));
        expect(newState).toEqual({ isLoggedIn: true, user: user });
    });
    test('returns logging is fail', () => {
        const initState = { isLoggedIn: false } as AuthState;
        const newState = reducer(initState, loginFail('string'));
        expect(newState).toEqual({ isLoggedIn: false, error: 'string' });
    });
    test('returns user is removed', () => {
        const initState = { isLoggedIn: false } as AuthState;
        const newState = reducer(initState, userLogout());
        expect(newState).toEqual({ isLoggedIn: false, user: null });
    });
    test('returns user is removed', () => {
        const initState = { isLoggedIn: false } as AuthState;
        const newState = reducer(initState, changeRefreshToken({ token: 'string', refreshToken: 'string' }));
        expect(newState).toEqual({ isLoggedIn: false, token: 'string', refreshToken: 'string' });
    });
});

let user = {
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
    imageName: 'string',
    address: {
        $id: '3',
        addressId: '3cce4d1e-db61-4ef9-8f46-0fa6f92df5ed',
        city: null,
        companyCode: null,
        country: null,
        customerId: null,
        sellerId: '652f41d6-8d66-47a2-82c3-9e50d1f7df4a',
        shopId: null,
        street: null,
        zip: null
    }
};
