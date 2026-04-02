const categories = [
  { name: 'Rent', type: 'expense', amountRange: [1200, 2500] },
  { name: 'Groceries', type: 'expense', amountRange: [50, 200] },
  { name: 'Salary', type: 'income', amountRange: [4000, 6000] },
  { name: 'Freelance', type: 'income', amountRange: [200, 1500] },
  { name: 'Transport', type: 'expense', amountRange: [20, 100] },
  { name: 'Utilities', type: 'expense', amountRange: [80, 300] },
  { name: 'Entertainment', type: 'expense', amountRange: [30, 250] },
];

const generateMockData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 100; i++) {
    const categoryObj = categories[Math.floor(Math.random() * categories.length)];
    const date = new Date(now);
    date.setDate(now.getDate() - Math.floor(Math.random() * 90)); // Spread over 90 days
    
    const amount = Math.floor(
      Math.random() * (categoryObj.amountRange[1] - categoryObj.amountRange[0]) + 
      categoryObj.amountRange[0]
    );

    data.push({
      id: (i + 1).toString(),
      date: date.toISOString().split('T')[0],
      amount,
      category: categoryObj.name,
      type: categoryObj.type,
      description: `${categoryObj.name} Transaction ${i + 1}`,
    });
  }
  
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const mockTransactions = generateMockData();
