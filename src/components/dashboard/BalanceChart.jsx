import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { format } from 'date-fns';

export const BalanceChart = () => {
  const { transactions } = useFinanceStore();

  // Sort transactions by date and calculate running balance
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let runningBalance = 0;
  const chartData = sortedTransactions.map((t) => {
    runningBalance += t.type === 'income' ? t.amount : -t.amount;
    return {
      date: format(new Date(t.date), 'MMM dd'),
      balance: runningBalance,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-w-0 w-full"
    >
      <Card className="h-[400px] w-full">
        <CardHeader>
          <CardTitle>Balance Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px] w-full min-h-[320px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity="var(--chart-area-opacity, 0.1)" />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border, #e2e8f0)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--chart-axis, #334155)' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--chart-axis, #334155)' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg, #fff)',
                    border: '1px solid var(--tooltip-border, #f3f4f6)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px',
                  }}
                  itemStyle={{ fontSize: '14px', fontWeight: '600' }}
                  labelStyle={{ fontSize: '12px', color: 'var(--text-muted, #94a3b8)', marginBottom: '4px' }}
                  cursor={{ stroke: '#4f46e5', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
