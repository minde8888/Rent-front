export interface User {
    $id: string;
    token: string;
    refreshToken: string;
    id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    occupation: string | null;
    role: string | null;
    imageName: string | null;
    addressDto: string | null;
}
