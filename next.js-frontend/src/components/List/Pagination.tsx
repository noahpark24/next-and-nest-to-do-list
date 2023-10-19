import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  paginate,
}) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={`inline-block mx-1 ${
          currentPage === i
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black'
        } rounded-full px-3 py-1`}
      >
        <button className="focus:outline-none" onClick={() => paginate(i)}>
          {i}
        </button>
      </li>
    );
  }

  return <ul className="pagination flex justify-center my-4">{pages}</ul>;
};

export default Pagination;
