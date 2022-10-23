export interface ResponseProducts {
    $id: string;
    pageNumber?: number;
    pageSize?: number;
    firstPage?: number;
    lastPage?: number;
    totalPages?: number;
    totalRecords?: number;
    nextPage?: number;
    previousPage?: number;
    productDto: Products;
}

interface Products {
    $id: string;
    $values: Product[];
}

export interface Product {
    imageName: string;
    place: string;
    price: string;
    phone: string;
    email: string;
    size: string;
    productsId: string;
    sellerId: string;
    imageSrc: Images;
    categoriesDto: Categories;
    postsDto: Post;
}

interface Images {
    $id: string;
    $values?: string[];
}

interface Categories {
    $id: string;
    $values: CatValues[];
}

interface Post {
    $id: string;
    content: string;
    postsId: string;
    productName: string;
}

export interface CatValues {
    $id?: string;
    categoriesId: string;
    categoriesName?: string;
    description?: string;
    imageName?: string;
}
