export interface User {
    $id: string;
    token?: string;
    refreshToken?: string;
    id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    occupation?: string;
    roles?: string;
    imageName?: string;
    addressDto?: Address;
    imageSrc?: ProfileImage;
}

export interface Address {
    $id: '3';
    addressId: string;
    city?: string;
    companyCode?: string;
    country?: string;
    customerId?: string;
    sellerId?: string;
    shopId?: string;
    street?: string;
    zip?: string;
}

export interface ProfileImage {
    $id: string;
    $values?: [string];
}
