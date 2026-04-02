import { TrendingUp, TrendingDown, Activity, PieChart } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { getHighestSpendingCategory, getMonthlyComparison } from '../../utils/calculations';
import { formatCurrency } from '../../lib/utils';

export const InsightsCards = () => {
  const { transactions } = useFinanceStore();
  const highestCategory = getHighestSpendingCategory(transactions);
  const { currentMonthTotal, lastMonthTotal } = getMonthlyComparison(transactions);
  const totalCount = transactions.length;

  const monthDiff = currentMonthTotal - lastMonthTotal;
  const isPositive = monthDiff >= 0;

  const insights = [
    {
      title: 'Top Spending Category',
      value: highestCategory ? highestCategory.name : 'N/A',
      subValue: highestCategory ? formatCurrency(highestCategory.value) : '',
      icon: PieChart,
      color: 'text-[#6366f1]',
    },
    {
      title: 'Monthly Comparison',
      value: isPositive ? 'Surplus' : 'Deficit',
      subValue: `${isPositive ? '+' : ''}${formatCurrency(monthDiff)} vs last month`,
      icon: isPositive ? TrendingUp : TrendingDown,
      color: isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]',
    },
    {
      title: 'Total Transactions',
      value: totalCount.toString(),
      subValue: 'All time records',
      icon: Activity,
      color: 'text-[#6366f1]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.map((insight) => (
        <div key={insight.title}>
          <Card>
            <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-xl bg-[var(--soft-surface)] mr-4">
              <insight.icon className={`w-6 h-6 ${insight.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)]">{insight.title}</p>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{insight.value}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{insight.subValue}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    ))}
    </div>
  );
};
