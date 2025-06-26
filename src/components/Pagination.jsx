import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-12 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded text-sm font-medium 
        bg-white text-blue-600 border-blue-600 hover:bg-blue-50 disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 border rounded text-sm font-medium ${
            currentPage === index + 1
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-700 border-blue-600 hover:bg-blue-50'
          } transition`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded text-sm font-medium 
        bg-white text-blue-600 border-blue-600 hover:bg-blue-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
