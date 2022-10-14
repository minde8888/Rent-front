import PageLink from './pageLink';

export type Props = {
    nextPage?: string;
    previousPage?: string;
    currentPage?: number;
    totalPages?: number;
    maxLength: number;
    setCurrentPage: (page: number) => void;
};

export default function Pagination({ nextPage, previousPage, currentPage, totalPages, maxLength, setCurrentPage }: Props) {
    let pageNumber = currentPage ?? 0;
    const pageNum = [pageNumber - 1, pageNumber, pageNumber + 1];
    return (
        <nav className="pagination" aria-label="Pagination">
            <PageLink href="#" disabled={currentPage === 1} onClick={() => setCurrentPage(pageNumber - 1)}>
                Previous
            </PageLink>
            {pageNum.map((pageNum, idx) => (
                <PageLink key={idx} href="#" active={currentPage === pageNum} disabled={isNaN(pageNum)} onClick={() => setCurrentPage(pageNum)}>
                    {pageNum}
                </PageLink>
            ))}
            <PageLink href="#" disabled={currentPage === totalPages} onClick={() => setCurrentPage(pageNumber + 1)}>
                Next
            </PageLink>
        </nav>
    );
}
