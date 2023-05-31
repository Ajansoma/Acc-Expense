import useOrder from './useOrder';

const useCalc = function () {
  const {
    expenses,
    orders,
    currentDate,
    previousDate,
    dateHandler,
    revenueCalc,
    costCalc,
    expensesCalc,
    formattedRevenue,
  } = useOrder();

  const monthlyOrders = dateHandler(orders, currentDate);
  const previousOrders = dateHandler(orders, previousDate);
  const monthlyRevenue = revenueCalc(monthlyOrders);
  const formattedAmount = formattedRevenue(monthlyRevenue);

  //calcuting difference in revenue
  const lastMonthRevenue = revenueCalc(previousOrders);
  const currentRevenue = revenueCalc(monthlyOrders);
  const revenueDif = currentRevenue - lastMonthRevenue;
  const absoluteRevenueDiff = Math.abs(revenueDif);
  const formattedRevenueChange = formattedRevenue(absoluteRevenueDiff);

  //CALCULATING DIFFERENCE IN REVENUE PERCENTAGE
  const changePercent = Math.ceil(
    (absoluteRevenueDiff / (lastMonthRevenue + currentRevenue)) * 100
  );

  //monthly cost
  const monthlyCost = costCalc(monthlyOrders);
  const formattedCost = formattedRevenue(monthlyCost);

  //gross profit or loss
  const profitOrLoss = monthlyRevenue - monthlyCost;
  const absProfitOrLoss = Math.abs(profitOrLoss);
  const formattedProfitOrLoss = formattedRevenue(absProfitOrLoss);
  const displayProfitOrLoss = profitOrLoss < 0 ? 'Loss' : 'Profit';

  //Expenses
  const currentMonthExpense = dateHandler(expenses, currentDate);
  const lastMonthExpenses = dateHandler(expenses, previousDate);
  const monthlyExpense = expensesCalc(currentMonthExpense);
  const lastMonthlyExpense = expensesCalc(lastMonthExpenses);
  const expenseDif = monthlyExpense - lastMonthlyExpense;
  const totalExpenses = monthlyExpense + lastMonthlyExpense;
  const formattedExpenses = formattedRevenue(monthlyExpense);
  const formattedExpensesDif = formattedRevenue(Math.abs(expenseDif));

  //Net profit
  const netProfitOrLoss = profitOrLoss - monthlyExpense;
  const netAbsProfitOrLoss = Math.abs(netProfitOrLoss);
  const netFormattedProfitOrLoss = formattedRevenue(netAbsProfitOrLoss);
  const displayNetProfitOrLoss = netAbsProfitOrLoss < 0 ? 'Loss' : 'Profit';

  return {
    monthlyOrders,
    previousOrders,
    totalExpenses,
    expenseDif,
    formattedAmount,
    formattedCost,
    formattedExpenses,
    formattedRevenueChange,
    formattedProfitOrLoss,
    formattedExpensesDif,
    netFormattedProfitOrLoss,
    displayNetProfitOrLoss,
    displayProfitOrLoss,
    revenueDif,
    changePercent,
    lastMonthRevenue,
    currentRevenue,
    revenueDif,
  };
};
export default useCalc;
