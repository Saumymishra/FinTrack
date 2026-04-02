import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { getCategoryData } from '../../utils/calculations';
import PropTypes from 'prop-types';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const ExpensePieChart = () => {
  const { transactions } = useFinanceStore();
  const data = getCategoryData(transactions);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="min-w-0 w-full"
    >
      <Card className="h-[400px] w-full">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px] w-full min-h-[320px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationBegin={500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg, #fff)',
                    border: '1px solid var(--tooltip-border, #f3f4f6)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px',
                  }}
                  itemStyle={{ fontSize: '14px', fontWeight: '600' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: 'var(--chart-axis, #334155)' }}
                />
              </PieChart>
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

ExpensePieChart.propTypes = {
  transactions: PropTypes.array,
};
