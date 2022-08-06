import { ImageError } from './addProduct/uploadImages/uploadProductImages';

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
    productCode?: string;
    category?: string;
}

export interface ImageData {
    file: File;
    data_url: Blob;
}
