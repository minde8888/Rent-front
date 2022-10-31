import { getProducts } from '../../redux/slice/productsSlice';
import { useAppDispatch } from '../../redux/store';
import { paginationProduct } from '../../services/products.services/products.services';

interface Props {
    firstPage: number;
    lastPage: number;
    nextPage: number;
    previousPage: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}

export default function Pagination({ firstPage, lastPage, nextPage, previousPage, pageNumber, pageSize, totalPages, totalRecords }: Props) {
    const dispatch = useAppDispatch();
    let navPageFirst = firstPage !== null && pageNumber !== 1 ? pageNumber - 1 : null;
    let navPageThird = nextPage !== null ? pageNumber + 1 : null;

    const onClick = async (pageNum: number | null) => {
        if (pageNum) {
            const data = await paginationProduct(pageNum);
            dispatch(getProducts(data));
        }
    };

    const pageNum = [navPageFirst, pageNumber, navPageThird];
    return (
        <nav className="pagination" aria-label="Pagination">
            <button
                onClick={() => {
                    onClick(previousPage);
                }}
                disabled={navPageFirst === null}
            >
                Previous
            </button>
            {pageNum.map((pageNum, i) => (
                nextPage !== 0 && <button
                    key={i}
                    onClick={() => {
                        onClick(pageNum);
                    }}
                    disabled={pageNum === pageNumber}
                >
                    {pageNum}
                </button>
            ))}
            <button
                onClick={() => {
                    onClick(nextPage);
                }}
                disabled={nextPage === 0}
            >
                Next
            </button>
        </nav>
    );
}
