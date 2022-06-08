export interface User {
    $id: string;
    token: string;
    refreshToken: string;
    id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    occupation?: string;
    roles: string;
    imageName?: string;
    addressDto?: Address;
}

interface Address {
    $id: '3';
    addressId: '3cce4d1e-db61-4ef9-8f46-0fa6f92df5ed';
    city: null;
    companyCode: null;
    country: null;
    customerId: null;
    sellerId: '652f41d6-8d66-47a2-82c3-9e50d1f7df4a';
    shopId: null;
    street: null;
    zip: null;
}
