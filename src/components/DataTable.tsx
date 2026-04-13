import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: string | ((item: T) => React.ReactNode);
  className?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
}

function DataTable<T>({ columns, data, pagination }: DataTableProps<T>) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((item, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors group">
                {columns.map((col, colIdx) => (
                  <td 
                    key={colIdx} 
                    className={`px-8 py-5 text-sm font-medium text-slate-600 ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''
                    } ${col.className || ''}`}
                  >
                    {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-8 py-6 bg-slate-50 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            Exibindo <span className="text-slate-900">{((pagination.currentPage - 1) * 10) + 1} - {Math.min(pagination.currentPage * 10, pagination.totalItems)}</span> de <span className="text-slate-900">{pagination.totalItems}</span> registros
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-400 hover:text-primary hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold shadow-md shadow-primary/20">
              {pagination.currentPage}
            </button>
            <button 
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-400 hover:text-primary hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:text-slate-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default DataTable;
