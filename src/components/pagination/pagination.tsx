
import PageLink from './pageLink';
// import './Pagination.css';

export type Props = {
    currentPage: number;
    lastPage: number;
    maxLength: number;
    setCurrentPage: (page: number) => void;
};

export default function Pagination({
    currentPage,
    lastPage,
    maxLength,
    setCurrentPage,
}: Props) {
    const baseUrl = 'http://localhost:4000/products';
    const pageNum = [1, 2, 3];

    return (
        <nav className="pagination" aria-label="Pagination">
            <PageLink
                href={`${baseUrl}/${currentPage - 1}`}
                disabled={currentPage === 1}
            >
                Previous
            </PageLink>
            {pageNum.map((pageNum, idx) => (
                <PageLink
                    key={idx}
                    href={`${baseUrl}/${pageNum}`}
                    active={currentPage === pageNum}
                    disabled={isNaN(pageNum)}
                >
                    {pageNum}
                </PageLink>
            ))}
            <PageLink
                href={`${baseUrl}/${currentPage + 1}`}
                disabled={currentPage === lastPage}
            >
                Next
            </PageLink>
        </nav>
    );
}