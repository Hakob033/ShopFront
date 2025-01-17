const Pagination = ({
  page,
  totalPages,
  handlePageChange,
  generatePagination,
}) => (
  <div className="mt-4 flex justify-end items-center space-x-2">
    {totalPages === 0 ? null : (
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 text-black-100 rounded-lg"
      >
        &lt;
      </button>
    )}
    {generatePagination().map((p, index) =>
      p === "..." ? (
        <span key={index} className="px-4 py-2 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(Number(p))}
          disabled={page === p}
          className={`px-4 py-2 rounded-full ${
            page === p
              ? " text-black-100 rounded-full "
              : "bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
          }`}
        >
          {p}
        </button>
      )
    )}
    {totalPages === 0 ? null : (
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 text-black-100  rounded-lg"
      >
        &gt;
      </button>
    )}
  </div>
);

export default Pagination;
