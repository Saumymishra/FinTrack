import { Search, RotateCcw, X } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

export const TransactionFilters = () => {
  const { transactions, filters, setFilters, resetFilters } = useFinanceStore();

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  const inputStyles = "w-full px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[#6366f1] outline-none transition-all";
  const labelStyles = "text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block";

  const activeFilters = [];
  if (filters.search) activeFilters.push({ key: 'search', label: `Search: ${filters.search}`, value: '' });
  if (filters.type !== 'all') activeFilters.push({ key: 'type', label: `Type: ${filters.type}`, value: 'all' });
  if (filters.category !== 'all') activeFilters.push({ key: 'category', label: `Category: ${filters.category}`, value: 'all' });
  if (filters.dateRange?.from) activeFilters.push({ key: 'dateRange.from', label: `From: ${filters.dateRange.from}`, value: { ...filters.dateRange, from: '' } });
  if (filters.dateRange?.to) activeFilters.push({ key: 'dateRange.to', label: `To: ${filters.dateRange.to}`, value: { ...filters.dateRange, to: '' } });

  const removeFilter = (key, resetValue) => {
    if (key.startsWith('dateRange.')) {
      const field = key.split('.')[1];
      setFilters({ dateRange: { ...filters.dateRange, [field]: '' } });
    } else {
      setFilters({ [key]: resetValue });
    }
  };

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4 md:p-5 space-y-6">
      {/* Row 1: Primary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-6 relative">
          <label className={labelStyles}>Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              placeholder="Search descriptions..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className={`${inputStyles} pl-10`}
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <label className={labelStyles}>Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ type: e.target.value })}
            className={inputStyles}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className={labelStyles}>Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className={inputStyles}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Secondary Filters & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5">
          <label className={labelStyles}>Date Range</label>
          <div className="flex items-center gap-2 bg-[var(--card)] px-3 py-2 rounded-lg border border-[var(--border)]">
            <input 
              type="date" 
              className="bg-transparent outline-none text-sm w-full text-[var(--text-primary)]"
              value={filters.dateRange?.from || ''}
              onChange={(e) => setFilters({ dateRange: { ...(filters.dateRange || { from: '', to: '' }), from: e.target.value } })}
            />
            <span className="text-[var(--text-muted)] text-sm">to</span>
            <input 
              type="date" 
              className="bg-transparent outline-none text-sm w-full text-[var(--text-primary)]"
              value={filters.dateRange?.to || ''}
              onChange={(e) => setFilters({ dateRange: { ...(filters.dateRange || { from: '', to: '' }), to: e.target.value } })}
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <label className={labelStyles}>Sort By</label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              setFilters({ sortBy, sortOrder });
            }}
            className={inputStyles}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelStyles}>Group By</label>
          <select
            value={filters.groupBy}
            onChange={(e) => setFilters({ groupBy: e.target.value })}
            className={inputStyles}
          >
            <option value="none">No Grouping</option>
            <option value="category">By Category</option>
            <option value="month">By Month</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            onClick={resetFilters}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-medium bg-[var(--soft-surface)] hover:bg-[var(--border)] transition-colors flex items-center justify-center gap-2 text-[var(--text-secondary)]"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {activeFilters.map((filter) => (
            <span 
              key={filter.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--soft-surface)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-wider border border-[var(--border)] animate-in fade-in zoom-in duration-200"
            >
              {filter.label}
              <button 
                onClick={() => removeFilter(filter.key, filter.value)}
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button 
            onClick={resetFilters}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] underline underline-offset-2 transition-colors ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
