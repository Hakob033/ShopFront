import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 2) pages.push(currentPage - 1);
      if (currentPage !== 1 && currentPage !== totalPages)
        pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      pages.push(totalPages);
      pages.sort((a, b) => a - b);
    }

    return pages;
  };

  return (
    <div className="mt-4 flex justify-end items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
      >
        &lt;
      </button>
      {generatePagination().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-4 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
