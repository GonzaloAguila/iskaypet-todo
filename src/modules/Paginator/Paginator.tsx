'use client';

import InputSelect from '@/src/components/inputs/InputSelect';
import type { SelectOption } from '@/src/components/inputs/InputSelect';
import styles from './Paginator.module.css';
import type { PaginatorProps } from './Paginator.types';

const DEFAULT_LIMIT_OPTIONS = [3, 5, 10];

export default function Paginator({
  page,
  pages,
  limit,
  total,
  limitOptions = DEFAULT_LIMIT_OPTIONS,
  onPageChange,
  onLimitChange,
}: PaginatorProps) {
  const selectOptions: SelectOption[] = limitOptions.map((opt) => ({
    value: opt,
    label: `${opt} por página`,
  }));

  const handleLimitChange = (value: string) => {
    onLimitChange(Number(value));
  };

  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pages) {
      onPageChange(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (pages <= maxVisiblePages) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(pages);
      } else if (page >= pages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = pages - 3; i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(page - 1);
        pageNumbers.push(page);
        pageNumbers.push(page + 1);
        pageNumbers.push('...');
        pageNumbers.push(pages);
      }
    }

    return pageNumbers;
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className={styles.paginator}>
      <div className={styles.limitSelector}>
        <InputSelect
          options={selectOptions}
          value={limit}
          onChange={handleLimitChange}
          aria-label="Items por página"
        />
      </div>

      <div className={styles.pageInfo}>
        <span className={styles.totalInfo}>
         Total: {total} {total === 1 ? 'elemento' : 'elementos'}
        </span>
      </div>

      {pages > 1 && (
        <div className={styles.navigation}>
          <button
            type="button"
            className={`${styles.pageButton} ${styles.navButton}`}
            onClick={handlePrevPage}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            &lt;
          </button>

          <div className={styles.pageNumbers}>
            {renderPageNumbers().map((pageNum, index) =>
              typeof pageNum === 'number' ? (
                <button
                  key={pageNum}
                  type="button"
                  className={`${styles.pageButton} ${page === pageNum ? styles.active : ''}`}
                  onClick={() => handlePageClick(pageNum)}
                  aria-label={`Ir a página ${pageNum}`}
                  aria-current={page === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ) : (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  {pageNum}
                </span>
              )
            )}
          </div>

          <button
            type="button"
            className={`${styles.pageButton} ${styles.navButton}`}
            onClick={handleNextPage}
            disabled={page === pages}
            aria-label="Página siguiente"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

