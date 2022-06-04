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
    addressDto?: string;
}
