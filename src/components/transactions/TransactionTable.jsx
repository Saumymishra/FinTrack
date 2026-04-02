import { Edit2, Trash2, ArrowUpRight, ArrowDownLeft, Receipt, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, cn } from '../../lib/utils';
import { format } from 'date-fns';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { TransactionForm } from './TransactionForm';

export const TransactionTable = () => {
  const { transactions, filters, role, deleteTransaction, setTransactionFormOpen, currentView } = useFinanceStore();
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Robust filtering logic
  let filteredTransactions = transactions;

  if (filters.search) {
    filteredTransactions = filteredTransactions.filter(t =>
      t.description.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  if (filters.type !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
  }

  if (filters.category !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filters.category);
  }

  if (filters.dateRange?.from) {
    filteredTransactions = filteredTransactions.filter(t => new Date(t.date) >= new Date(filters.dateRange.from));
  }

  if (filters.dateRange?.to) {
    filteredTransactions = filteredTransactions.filter(t => new Date(t.date) <= new Date(filters.dateRange.to));
  }

  // Sorting logic
  filteredTransactions = [...filteredTransactions].sort((a, b) => {
    const order = filters.sortOrder === 'asc' ? 1 : -1;
    if (filters.sortBy === 'date') {
      // Default latest first if sortOrder is desc
      return (new Date(b.date).getTime() - new Date(a.date).getTime()) * (filters.sortOrder === 'asc' ? -1 : 1);
    }
    return (a.amount - b.amount) * order;
  });

  // Limit to 10-15 on Dashboard
  const displayedTransactions = currentView === 'Dashboard' 
    ? filteredTransactions.slice(0, 15) 
    : filteredTransactions;

  const renderTable = (data, title) => (
    <div className="space-y-4">
      {title && <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest px-2">{title}</h3>}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--soft-surface)]">
            <tr className="text-left text-xs text-[var(--text-secondary)] uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              {role === 'Admin' && (
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            <AnimatePresence mode="popLayout">
              {data.map((t, index) => (
                <motion.tr 
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                  className="hover:bg-[var(--bg)] transition-colors group"
                >
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {format(new Date(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[var(--border)]",
                      t.type === 'income' 
                        ? "bg-[var(--soft-surface)] text-[#22c55e]"
                        : "bg-[var(--soft-surface)] text-[#ef4444]"
                    )}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-primary)] font-medium">{t.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {t.type === 'income' ? (
                        <ArrowUpRight className="w-4 h-4 text-[#22c55e] mr-1.5" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-[#ef4444] mr-1.5" />
                      )}
                      <span className={`font-bold tabular-nums ${t.type === 'income' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                    </div>
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTransaction(t)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTransaction(t.id)}
                        className="text-[var(--text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (filteredTransactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[var(--soft-surface)] rounded-2xl border-2 border-dashed border-[var(--border)] transition-all"
      >
        <div className="w-16 h-16 bg-[var(--card)] rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-[var(--border)]">
          <Receipt className="w-8 h-8 text-[var(--text-muted)]" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          No transactions found
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto mb-8">
          We couldn't find any transactions matching your current filters. Try adjusting them or start fresh.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={() => useFinanceStore.getState().resetFilters()}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear Filters
          </Button>
          
          {role === 'Admin' && (
            <Button 
              onClick={() => setTransactionFormOpen(true)}
              className="shadow-md shadow-indigo-200"
            >
              + Add Transaction
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  if (filters.groupBy === 'none') {
    return (
      <div className="space-y-4">
        {renderTable(displayedTransactions)}
        {editingTransaction && (
          <TransactionForm
            transaction={editingTransaction}
            onClose={() => setEditingTransaction(null)}
          />
        )}
      </div>
    );
  }

  const groupedData = {};
  displayedTransactions.forEach((t) => {
    let key = '';
    if (filters.groupBy === 'category') {
      key = t.category;
    } else if (filters.groupBy === 'month') {
      key = format(new Date(t.date), 'MMMM yyyy');
    }
    if (!groupedData[key]) groupedData[key] = [];
    groupedData[key].push(t);
  });

  return (
    <div className="space-y-8">
      {Object.entries(groupedData).map(([key, data]) => (
        <div key={key} className="border border-[var(--border)] rounded-xl overflow-hidden">
          {renderTable(data, key)}
        </div>
      ))}
      {editingTransaction && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};
