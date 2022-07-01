export interface Products {
    attachments: Array<File>;
    imageName: Array<string>;
    imageSrc: Array<string>;
    height: Array<string>;
    width: Array<string>;
    productName: string;
    quantityPerUnit: string;
    unitPrice: string;
    unitsInStock: string;
    warehousePlace: string;
    sellerId: string;
    category: Array<string>;
    post: {
        postsId: string;
        content: string;
    };
    specifications: Specifications;
}

interface Specifications {
    maxLoad: string;
    weight: string;
    liftingHeight: string;
    capacity: string;
    energySource: string;
    speed: string;
    length: string;
    width: string;
    height: string;
}
