import { ImageError } from './addProduct/uploadImages/uploadProductImages';

export interface Product {
    id: string;
    description?: string;
    imageFile?: File | ImageError;
    imageName?: string;
    height?: string;
    width?: string;
    quantityPerUnit?: string;
    unitPrice?: string;
    unitsInStock?: string;
    warehousePlace?: string;
    categories?: string;
    maxLoad?: string;
    weight?: string;
    liftingHeight?: string;
    capacity?: string;
    energySource?: string;
    speed?: string;
    length?: string;
    productWidth?: string;
    productHeight?: string;
    productCode?: string;
    addCategory?: string;
}

export interface ImageData {
    file: File;
    data_url: Blob;
}
