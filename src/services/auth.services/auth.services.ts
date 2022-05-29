import axios, { AxiosResponse } from 'axios';

const AUTH_URL = 'https://localhost:44346/api/v1/auth/';

export interface Response {
    Id: string;
    sellerId?: string;
    customersId?: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    occupation?: string;
    role?: string;
    address: {
        addressId: string;
        street: string;
        city: string;
        zip: string;
        country: string;
        companyCode: string;
    };
}

export const login = async (email: string, password: string) => {
    return await axios.post<{ data: Response[] }>(AUTH_URL + 'login', {
        email: email,
        password: password
    });
};

export const logout = (): void => {
    localStorage.removeItem('user');
};

export const register = async (name: string, surname: string, mobile: string, email: string, password: string, role: string) => {
    console.log(role);

    return await axios.post<AxiosResponse>(AUTH_URL + 'signup', {
        name: name,
        surname: surname,
        phoneNumber: mobile,
        email: email,
        password: password,
        Roles: role
    });
};

export const getCurrentUser = (): null | string => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};
