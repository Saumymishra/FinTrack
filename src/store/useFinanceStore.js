import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

export const useFinanceStore = create(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: 'Admin',
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        dateRange: {
          from: '',
          to: '',
        },
        sortBy: 'date',
        sortOrder: 'desc',
        groupBy: 'none',
      },
      isSidebarCollapsed: false,
      isMobileSidebarOpen: false,
      isTransactionFormOpen: false,
      currentView: 'Dashboard',
      setRole: (role) => set({ role }),
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setMobileSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),
      setTransactionFormOpen: (isOpen) => set({ isTransactionFormOpen: isOpen }),
      setCurrentView: (view) => set({ currentView: view }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Math.random().toString(36).substring(2, 9) },
          ],
        })),
      editTransaction: (id, updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            type: 'all',
            category: 'all',
            dateRange: {
              from: '',
              to: '',
            },
            sortBy: 'date',
            sortOrder: 'desc',
            groupBy: 'none',
          },
        }),
    }),
    {
      name: 'finance-storage',
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // If dateRange is missing, add it
          if (persistedState.filters && !persistedState.filters.dateRange) {
            persistedState.filters.dateRange = { from: '', to: '' };
          }
          if (persistedState.filters && persistedState.filters.groupBy === undefined) {
            persistedState.filters.groupBy = 'none';
          }
        }
        return persistedState;
      },
    }
  )
);
