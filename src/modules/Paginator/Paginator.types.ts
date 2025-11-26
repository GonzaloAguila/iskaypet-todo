export interface PaginatorProps {
  page: number;
  pages: number;
  limit: number;
  total: number;
  limitOptions?: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

