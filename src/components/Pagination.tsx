import React, { useState } from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { colors } from '../constants/Palette';

interface PaginationProps {
    totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(5); // Set default currentPage as 5 for demonstration
    const visiblePages = 3; // Number of pages to show before and after the current page

    // Calculate the start and end page based on the current page
    const startPage = Math.max(currentPage - 1, 1); // Ensures we start from 7 or similar when at page 5
    const endPage = Math.min(currentPage + 1, totalPages); // Ensures we show up to 9

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalNumbers = visiblePages * 2 + 2; // Total number of visible page numbers with ellipses

        if (totalPages <= totalNumbers) {
            // If total pages are less than or equal to the total numbers we can show, just show them all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
        } else {
            // Show the first set of pages
            for (let i = 1; i <= visiblePages; i++) {
                pageNumbers.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
            pageNumbers.push(<BootstrapPagination.Ellipsis key="ellipsis-start" />);

            // Show pages around the current page
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </BootstrapPagination.Item>
                );
            }

            // Add the second ellipsis if necessary
            if (endPage < totalPages - 1) {
                pageNumbers.push(<BootstrapPagination.Ellipsis key="ellipsis-end" />);
            }

            // Show the last set of pages
            for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <BootstrapPagination>
            <BootstrapPagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ backgroundColor: colors.pagecolor, color: colors.pagecolor }}
            >
                ‹Previous
            </BootstrapPagination.Prev>
            {renderPageNumbers()}
            <BootstrapPagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ backgroundColor: colors.pagecolor, color: colors.pagecolor }}
            >
                ›
            </BootstrapPagination.Next>
        </BootstrapPagination>
    );
};

export default Pagination;
