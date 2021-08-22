import moment from 'moment';

export function totalExpenses(expenses, date) {
    var totalExpensesThisMonth = 0;
    const momentDate = moment(date);
    expenses.forEach((expense, index) => {
        if (moment(expense.date).month() === momentDate.month()) {
            totalExpensesThisMonth += expense.amount; 
        }
    })
}