import { ImageError } from './addProduct/uploadImages/uploadProductImages.component';

export interface Product {
    sellerId: string;
    description?: string;
    imageFile?: File | ImageError;
    imageName?: string;
    height?: string;
    width?: string;
    price?: string;
    place?: string;
    size?: string;
    phone?: string;
    email?: string;
    category?: string;
}

export interface ImageFiles {
    file?: File;
    data_url: string;
}
