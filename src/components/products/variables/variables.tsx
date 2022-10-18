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
    pageNumber: 0,
    pageSize: 0,
    firstPage: '',
    lastPage: '',
    totalPages: 0,
    totalRecords: 0,
    nextPage: '',
    previousPage: '',
    productDto: { $id: '', $values: [product] }
};
