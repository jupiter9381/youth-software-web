import { useEffect, useState } from 'react';
import PaginationFirst from '../../assets/outline/pagination_icons/First.svg';
import PaginationPrev from '../../assets/outline/pagination_icons/Prev.svg';
import PaginationNext from '../../assets/outline/pagination_icons/Next.svg';
import PaginationLast from '../../assets/outline/pagination_icons/Last.svg';
import SvgColorChanger from '../../functions/SvgColorChanger';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  currentPage: number;
  customItemsPerPageOptions?: number[];
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  currentPage,
  customItemsPerPageOptions,
}: PaginationProps) => {
  const [itemsPerPageOptions, setItemsPerPageOptions] = useState([
    10, 20, 30, 50,
  ]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    if (customItemsPerPageOptions) {
      setItemsPerPageOptions(customItemsPerPageOptions);
    }
  }, [customItemsPerPageOptions]);

  return (
    <div className="flex items-center gap-4 w-full justify-between">
      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-caption-all-caps text-nt-300">
          ITEMS PER PAGE
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          className="min-w-[70px] h-8 text-caption-str border border-nt-100 rounded-lg px-4 py-0 text-nt-700 focus:outline-none focus:border-pm-500 flex flex-wrap content-center"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="h-6 w-6"
        >
          <SvgColorChanger
            svgPath={PaginationFirst}
            strokeColor={currentPage === 1 ? '#DBDEE7' : '#757784'}
          />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-4 w-4"
        >
          <SvgColorChanger
            svgPath={PaginationPrev}
            strokeColor={currentPage === 1 ? '#DBDEE7' : '#757784'}
          />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(
            Math.max(0, currentPage - 2),
            Math.min(totalPages, currentPage + 1),
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                page === currentPage
                  ? 'bg-white border border-nt-150 text-pm-500 text-caption-reg'
                  : 'text-caption-reg text-nt-700'
              }`}
            >
              {page}
            </button>
          ))}

        {/* Ellipsis if more pages exist */}
        {currentPage < totalPages - 2 && (
          <span className="text-body-base-reg text-nt-400">...</span>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <SvgColorChanger
            svgPath={PaginationNext}
            strokeColor={currentPage === totalPages ? '#DBDEE7' : '#757784'}
          />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <SvgColorChanger
            svgPath={PaginationLast}
            strokeColor={currentPage === totalPages ? '#DBDEE7' : '#757784'}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
