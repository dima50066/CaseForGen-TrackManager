import React from "react";

interface Props {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  isLoading?: boolean;
}

const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onNext,
  onPrev,
  isLoading = false,
}) => {
  const isFirst = page === 1;
  const isLast = page >= totalPages;

  return (
    <div
      data-testid="pagination"
      className="flex gap-4 items-center justify-center mt-6"
      aria-live="polite"
    >
      <button
        aria-label="Previous Page"
        data-testid="pagination-prev"
        onClick={onPrev}
        disabled={isFirst || isLoading}
        aria-disabled={isFirst || isLoading}
        data-loading={isLoading ? "true" : undefined}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        aria-label="Next Page"
        data-testid="pagination-next"
        onClick={onNext}
        disabled={isLast || isLoading}
        aria-disabled={isLast || isLoading}
        data-loading={isLoading ? "true" : undefined}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(Pagination);
