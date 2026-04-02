import React from 'react';
import { LayoutDashboard, Receipt, PieChart as ChartIcon, UserCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import PropTypes from 'prop-types';

export const Sidebar = ({ isMobile, onClose }) => {
  const { role, setRole, isSidebarCollapsed, toggleSidebar, currentView, setCurrentView } = useFinanceStore();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'Dashboard' },
    { icon: Receipt, label: 'Transactions', id: 'Transactions' },
    { icon: ChartIcon, label: 'Insights', id: 'Insights' },
  ];

  const handleNavClick = (view) => {
    setCurrentView(view);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <motion.div
      layout
      className={cn(
        "h-full flex flex-col bg-[var(--card)] text-[var(--text-secondary)] border-r border-[var(--border)] transition-all duration-300 ease-in-out relative",
        !isMobile && isSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {(!isSidebarCollapsed || isMobile) && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <LayoutDashboard className="w-8 h-8 text-[#6366f1] shrink-0" />
              <h1 className="text-2xl font-bold text-[var(--text-primary)] truncate">FinTrack</h1>
            </motion.div>
          )}
        </AnimatePresence>

        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Desktop Toggle Button - Always Visible */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="absolute -right-3 top-6 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--card)] text-[var(--text-secondary)] shadow-md border border-[var(--border)] hover:bg-[var(--soft-surface)] transition-all duration-200 active:scale-95 z-50"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group cursor-pointer relative",
              currentView === item.id
                ? "bg-[rgba(99,102,241,0.1)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--soft-surface)] hover:text-[var(--text-primary)]"
            )}
          >
            {currentView === item.id && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-[rgba(99,102,241,0.1)] dark:bg-[#6366f1] rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className={cn("w-5 h-5 shrink-0", currentView === item.id
              ? "text-[#6366f1]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]")} />
            <AnimatePresence mode="wait">
              {(!isSidebarCollapsed || isMobile) && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl bg-[var(--bg)] transition-all duration-300 overflow-hidden border border-[var(--border)]",
          !isMobile && isSidebarCollapsed ? "justify-center" : ""
        )}>
          <UserCircle className="w-10 h-10 text-[var(--text-muted)] shrink-0" />
          <AnimatePresence mode="wait">
            {(!isSidebarCollapsed || isMobile) && (
              <motion.div
                key="user"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">Saumy Mishra</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {(!isSidebarCollapsed || isMobile) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRole(role === 'Admin' ? 'Viewer' : 'Admin')}
              className="text-[#6366f1] hover:text-[#4f46e5] p-1 shrink-0"
            >
              Switch
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

Sidebar.propTypes = {
  isMobile: PropTypes.bool,
  onClose: PropTypes.func,
};
