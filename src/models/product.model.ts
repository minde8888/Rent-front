export interface Product {
    $id: string;
    imageHeight: string;
    imageWidth: string;
    place: string;
    price: string;
    productCode: string;
    size: string;
    productsId: string;
    sellerId: string;
    imageSrc: Images;
    categoriesDto: Categories;
    PostsDto: Post;
}

interface Images {
    $id: string;
    $values?: [string];
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

interface CatValues {
    $id: string;
    categoriesId: string;
    categoriesName: string;
    description?: string;
    imageName?: string;
}
