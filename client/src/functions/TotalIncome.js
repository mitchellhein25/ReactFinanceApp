import moment from 'moment';

export function totalIncome(incomes, date) {
    var totalIncomeThisMonth = 0;
    const momentDate = moment(date);
    incomes.forEach((income, index) => {
        if (moment.utc(income.date).month() === momentDate.month() 
            && moment.utc(income.date).year() === momentDate.year()) {
                totalIncomeThisMonth += income.amount; 
        }
    })
    return totalIncomeThisMonth;
}