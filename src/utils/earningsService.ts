/**
 * Service for managing user earnings in localStorage
 */

export interface Earning {
  id: string;
  userId: string;
  appId: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'completed';
  offerName?: string;
}

export interface UserBalance {
  userId: string;
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
}

const EARNINGS_STORAGE_KEY = 'elhossary_earnings';
const BALANCES_STORAGE_KEY = 'elhossary_balances';

/**
 * Get all earnings from localStorage
 */
export const getAllEarnings = (): Earning[] => {
  try {
    const earnings = localStorage.getItem(EARNINGS_STORAGE_KEY);
    return earnings ? JSON.parse(earnings) : [];
  } catch (error) {
    console.error('Error getting earnings:', error);
    return [];
  }
};

/**
 * Get earnings for a specific user
 */
export const getUserEarnings = (userId: string): Earning[] => {
  const allEarnings = getAllEarnings();
  return allEarnings.filter(earning => earning.userId === userId);
};

/**
 * Add a new earning record
 */
export const addEarning = (earning: Omit<Earning, 'id' | 'timestamp'>): Earning => {
  const newEarning: Earning = {
    ...earning,
    id: `earning_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };

  const allEarnings = getAllEarnings();
  allEarnings.push(newEarning);
  
  localStorage.setItem(EARNINGS_STORAGE_KEY, JSON.stringify(allEarnings));
  
  // Update user balance
  updateUserBalance(earning.userId);
  
  return newEarning;
};

/**
 * Update user balance based on their earnings
 */
export const updateUserBalance = (userId: string): UserBalance => {
  const userEarnings = getUserEarnings(userId);
  
  const totalEarnings = userEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  const completedEarnings = userEarnings
    .filter(earning => earning.status === 'completed')
    .reduce((sum, earning) => sum + earning.amount, 0);
  const pendingEarnings = userEarnings
    .filter(earning => earning.status === 'pending')
    .reduce((sum, earning) => sum + earning.amount, 0);

  const balance: UserBalance = {
    userId,
    totalEarnings,
    availableBalance: completedEarnings,
    pendingBalance: pendingEarnings,
  };

  // Store updated balance
  const allBalances = getAllBalances();
  const existingBalanceIndex = allBalances.findIndex(b => b.userId === userId);
  
  if (existingBalanceIndex >= 0) {
    allBalances[existingBalanceIndex] = balance;
  } else {
    allBalances.push(balance);
  }
  
  localStorage.setItem(BALANCES_STORAGE_KEY, JSON.stringify(allBalances));
  
  return balance;
};

/**
 * Get all user balances
 */
export const getAllBalances = (): UserBalance[] => {
  try {
    const balances = localStorage.getItem(BALANCES_STORAGE_KEY);
    return balances ? JSON.parse(balances) : [];
  } catch (error) {
    console.error('Error getting balances:', error);
    return [];
  }
};

/**
 * Get balance for a specific user
 */
export const getUserBalance = (userId: string): UserBalance => {
  const allBalances = getAllBalances();
  const existingBalance = allBalances.find(balance => balance.userId === userId);
  
  if (existingBalance) {
    return existingBalance;
  }
  
  // If no balance exists, create one
  return updateUserBalance(userId);
};

/**
 * Process a postback and add earning
 */
export const processPostback = (appId: string, userId: string, payout: number): Earning => {
  const earning = addEarning({
    userId,
    appId,
    amount: payout,
    status: 'completed', // Mark as completed since it's a successful postback
  });
  
  console.log('Postback processed:', { appId, userId, payout, earningId: earning.id });
  
  return earning;
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};
