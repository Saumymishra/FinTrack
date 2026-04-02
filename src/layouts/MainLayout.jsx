import React from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { cn } from '../lib/utils';
import { exportToCSV, exportToJSON } from '../utils/export';
import { useDarkMode } from '../hooks/useDarkMode';
import PropTypes from 'prop-types';

export const MainLayout = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { 
    isSidebarCollapsed, 
    isMobileSidebarOpen, 
    setMobileSidebarOpen,
    isTransactionFormOpen,
    setTransactionFormOpen,
    transactions,
    filters
  } = useFinanceStore();
  
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || t.type === filters.type;
    const matchesCategory = filters.category === 'all' || t.category === filters.category;
    
    const transactionDate = new Date(t.date);
    const matchesDateFrom = !filters.dateRange?.from || transactionDate >= new Date(filters.dateRange.from);
    const matchesDateTo = !filters.dateRange?.to || transactionDate <= new Date(filters.dateRange.to);

    return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo;
  });

  const handleExportCSV = () => exportToCSV(filteredTransactions);
  const handleExportJSON = () => exportToJSON(filteredTransactions);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 bg-[var(--bg)] text-[var(--text-primary)]"
    )}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 z-50 lg:hidden"
            >
              <Sidebar isMobile onClose={() => setMobileSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside className={cn(
        "fixed left-0 top-0 h-full border-r hidden lg:block z-40 transition-all duration-300",
        "bg-[var(--card)] border-[var(--border)]",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className={cn(
        "min-h-screen transition-all duration-300",
        isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <Navbar 
          onMenuClick={() => setMobileSidebarOpen(true)}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleDarkMode}
          onAddTransaction={() => setTransactionFormOpen(true)}
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
        />

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <AnimatePresence>
        {isTransactionFormOpen && (
          <TransactionForm onClose={() => setTransactionFormOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};
