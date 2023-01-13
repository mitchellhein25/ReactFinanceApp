import moment from 'moment';

export function totalExpenses(expenses, date) {
    var totalExpensesThisMonth = 0;
    const momentDate = moment(date);
    expenses.forEach((expense, index) => {
        if (moment.utc(expense.date).month() === momentDate.month() 
            && moment.utc(expense.date).year() === momentDate.year()) {
                totalExpensesThisMonth += expense.amount; 
        }
    });
    return totalExpensesThisMonth;
}