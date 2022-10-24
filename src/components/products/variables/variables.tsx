export const catValues = {
    $id: '',
    categoriesId: '123',
    categoriesName: 'test-1234',
    description: '',
    imageName: ''
};

export const product = {
    imageName: '',
    place: 'Test',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '123',
    sellerId: '',
    imageSrc: { $id: '', $values: ['test-img'] },
    categoriesDto: { $id: '', $values: [catValues] },
    postsDto: {
        $id: '',
        content: '',
        postsId: '',
        productName: ''
    }
};

export const response = {
    $id: '',
    firstPage: 0,
    nextPage: 0,
    pageNumber: 0,
    pageSize: 0,
    previousPage: 0,
    totalPages: 0,
    totalRecords: 0,
    productDto: { $id: '', $values: [product] }
};
