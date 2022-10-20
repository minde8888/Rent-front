import PageLink from './pageLink';

interface Props {
    firstPage?: string;
    lastPage?: string;
    nextPage?: string;
    previousPage?: string;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    // setCurrentPage: (page: number) => void;
}

export default function Pagination({ firstPage, lastPage, nextPage, previousPage, pageNumber, pageSize, totalPages, totalRecords }: Props) {
    // let pageNumber = currentPage ?? 0;
    const pageNum = [pageNumber - 1, pageNumber, pageNumber + 1];
    return (
        <nav className="pagination" aria-label="Pagination">
            <PageLink previousPage={previousPage} disabled={pageNumber === 1}>
                Previous
            </PageLink>
            {pageNum.map((pageNum, i) => (
                <PageLink key={i} href="#" disabled={pageNum === pageNumber}>
                    {pageNum}
                </PageLink>
            ))}
            <PageLink nextPage={nextPage} disabled={pageNumber === totalPages}>
                Next
            </PageLink>
        </nav>
    );
}
