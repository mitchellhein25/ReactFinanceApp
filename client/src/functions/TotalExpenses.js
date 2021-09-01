import moment from 'moment';

export function totalExpenses(expenses, date) {
    var totalExpensesThisMonth = 0;
    const momentDate = moment(date);

    const addOneDate = (expense) => {
        var expenseDate = moment(expense.date);
        expenseDate.date(expenseDate.date() + 1);
        return expenseDate.month()
      }

    expenses.forEach((expense, index) => {
        if (addOneDate(expense)  === momentDate.month()) {
            totalExpensesThisMonth += expense.amount; 
        }
    });
    return totalExpensesThisMonth;
}