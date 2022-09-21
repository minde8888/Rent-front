export interface Products {
    images: Array<File>;
    imageHeight: string;
    imageWidth: string;
    place: string;
    price: string;
    phone: string;
    size: string;
    sellerId: string;
    category: Array<string>;
    post: {
        productName: string;
        postsId: string;
        content: string;
    };
}
