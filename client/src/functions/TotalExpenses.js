import moment from 'moment';

export function totalExpenses(expenses, date) {
    var totalExpensesThisMonth = 0;
    const momentDate = moment(date);

    const addOneDateMonth = (expense) => {
        var expenseDate = moment(expense.date);
        expenseDate.date(expenseDate.date() + 1);
        return expenseDate.month()
    }

    const addOneDateYear = (expense) => {
        var expenseDate = moment(expense.date);
        expenseDate.date(expenseDate.date() + 1);
        return expenseDate.year()
    }

    expenses.forEach((expense, index) => {
        if (addOneDateMonth(expense) === momentDate.month() && addOneDateYear(expense) === momentDate.year()) {
            totalExpensesThisMonth += expense.amount; 
        }
    });
    return totalExpensesThisMonth;
}