import { startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';

export const calculateSummary = (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return { totalBalance, totalIncome, totalExpenses };
};

export const getCategoryData = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categories = {};

  expenses.forEach((t) => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getMonthlyComparison = (transactions) => {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const currentMonthTotal = transactions
    .filter((t) => isWithinInterval(new Date(t.date), { start: currentMonthStart, end: currentMonthEnd }))
    .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);

  const lastMonthTotal = transactions
    .filter((t) => isWithinInterval(new Date(t.date), { start: lastMonthStart, end: lastMonthEnd }))
    .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);

  return { currentMonthTotal, lastMonthTotal };
};

export const getHighestSpendingCategory = (transactions) => {
  const categoryData = getCategoryData(transactions);
  if (categoryData.length === 0) return null;
  return categoryData.reduce((prev, current) => (prev.value > current.value ? prev : current));
};
