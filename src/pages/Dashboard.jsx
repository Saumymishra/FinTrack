import { motion } from 'motion/react';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { ExpensePieChart } from '../components/dashboard/ExpensePieChart';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { InsightsCards } from '../components/insights/InsightsCards';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useFinanceStore } from '../store/useFinanceStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const Dashboard = () => {
  const { currentView } = useFinanceStore();

  return (
    <motion.div
      key={currentView}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {currentView === 'Dashboard' && 'Financial Overview'}
          {currentView === 'Transactions' && 'Transaction History'}
          {currentView === 'Insights' && 'Smart Insights'}
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          {currentView === 'Dashboard' && "Welcome back! Here's what's happening with your money."}
          {currentView === 'Transactions' && "View and manage all your financial activities."}
          {currentView === 'Insights' && "Personalized tips and analysis based on your spending."}
        </p>
      </motion.div>

      {currentView === 'Dashboard' && (
        <>
          {/* Summary Section */}
          <motion.div variants={itemVariants}>
            <SummaryCards />
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
            <BalanceChart />
            <ExpensePieChart />
          </motion.div>

          {/* Insights Preview */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Recent Insights</h2>
            </div>
            <InsightsCards />
          </motion.div>
        </>
      )}

      {currentView === 'Insights' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <InsightsCards />
          {/* Add more detailed insights here if needed */}
        </motion.div>
      )}

      {(currentView === 'Dashboard' || currentView === 'Transactions') && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {currentView === 'Dashboard' ? 'Recent Transactions' : 'All Transactions'}
            </h2>
          </div>
          <TransactionFilters />
          <TransactionTable />
        </motion.div>
      )}
    </motion.div>
  );
};
