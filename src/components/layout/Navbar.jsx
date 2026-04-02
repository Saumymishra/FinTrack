import React from 'react';
import { Menu, Sun, Moon, LogOut, Plus, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { useFinanceStore } from '../../store/useFinanceStore';
import PropTypes from 'prop-types';

export const Navbar = ({ 
  onMenuClick, 
  isDarkMode, 
  onThemeToggle,
  onAddTransaction,
  onExportCSV,
  onExportJSON
}) => {
  const { role, currentView } = useFinanceStore();

  return (
    <header className="sticky top-0 z-30 bg-[var(--card)] text-[var(--text-primary)] border-b border-[var(--border)] px-4 lg:px-8 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-bold lg:hidden text-[#6366f1]">FinTrack</h2>
          <h2 className="text-xl font-bold hidden lg:block text-[var(--text-primary)]">{currentView}</h2>
        </div>

        {/* Actions - Always visible on mobile as requested */}
        <div className="flex items-center gap-2 lg:gap-4 ml-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExportCSV}
              className="border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg)] hover:text-[var(--text-primary)] h-10 px-3 sm:px-4"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">CSV</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExportJSON}
              className="border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg)] hover:text-[var(--text-primary)] h-10 px-3 sm:px-4"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">JSON</span>
              </Button>
            </div>
            
            {role === 'Admin' && (
              <Button 
                size="sm" 
                onClick={onAddTransaction}
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-[var(--btn-primary-text)] h-10 px-3 sm:px-4 shadow-sm"
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            )}
          </div>

          <div className="h-8 w-px bg-[var(--border)] mx-1 hidden sm:block" />

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="rounded-full p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-2 sm:px-3">
              <LogOut className="w-5 h-5 lg:mr-2" />
              <span className="hidden lg:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  onAddTransaction: PropTypes.func.isRequired,
  onExportCSV: PropTypes.func.isRequired,
  onExportJSON: PropTypes.func.isRequired,
};
