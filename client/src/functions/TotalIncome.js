import moment from 'moment';

export function totalIncome(incomes, date) {
    var totalIncomeThisMonth = 0;
    const momentDate = moment(date);
    incomes.forEach((income, index) => {
        if (moment(income.date).month() === momentDate.month()) {
            totalIncomeThisMonth += income.amount; 
        }
    })
}