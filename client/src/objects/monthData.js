export class MonthData {
  constructor(month, year) {
    this.month = month;
    this.year = year;
  }
  cashFlow = 0;
  netWorth = 0;
  accounts = [];
  totalIncome = 0;
  totalExpenses = 0;
}