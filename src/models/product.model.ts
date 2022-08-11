export interface Product {
    imageName: string;
    place: string;
    price: string;
    productCode: string;
    size: string;
    productsId: string;
    sellerId: string;
    imageSrc: Images;
    categoriesDto: Categories;
    postsDto: Post;
}

interface Images {
    $id: string;
    $values?: Array<string>;
}

interface Categories {
    $id: string;
    $values?: CatValues[];
}

interface Post {
    $id: string;
    content: string;
    postsId: string;
    productName: string;
}

export interface CatValues {
    $id: string;
    categoriesId: string;
    categoriesName: string;
    description?: string;
    imageName?: string;
}
