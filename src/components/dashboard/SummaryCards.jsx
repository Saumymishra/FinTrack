import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { calculateSummary } from '../../utils/calculations';
import { formatCurrency, cn } from '../../lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const SummaryCards = () => {
  const { transactions } = useFinanceStore();
  const { totalBalance, totalIncome, totalExpenses } = calculateSummary(transactions);

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: Wallet,
      color: 'text-[#6366f1]'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-[#22c55e]'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'text-[#ef4444]'
    },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {cards.map((card) => (
        <motion.div 
          key={card.title} 
          variants={item}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Card className="overflow-hidden border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300 bg-[var(--card)]">
            <CardContent className={cn("p-6 border-l-4 border-l-current", card.color.split(' ')[0])}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[var(--soft-surface)]">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--soft-surface)] px-2 py-1 rounded">Live</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                  {formatCurrency(card.amount)}
                </h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
