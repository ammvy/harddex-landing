import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  pages: number;
  onPage: (p: number) => void;
};

export default function Pagination({ page, pages, onPage }: PaginationProps) {
  if (pages <= 1) return null;
  return (
    <div
      className="flex items-center justify-end gap-2 mt-4"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-8 h-8 border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronLeft size={14} strokeWidth={1.8} />
      </button>
      <span className="uppercase tracking-widest text-[10px] opacity-60 px-1">
        {page} / {pages}
      </span>
      <button
        onClick={() => onPage(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="w-8 h-8 border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronRight size={14} strokeWidth={1.8} />
      </button>
    </div>
  );
}
