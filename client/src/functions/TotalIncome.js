import moment from 'moment';

export function totalIncome(incomes, date) {
    var totalIncomeThisMonth = 0;
    const momentDate = moment(date);
    const addOneDate = (income) => {
        var incomeDate = moment(income.date);
        incomeDate.date(incomeDate.date() + 1);
        return incomeDate.month()
      }
    incomes.forEach((income, index) => {
        if (addOneDate(income) === momentDate.month()) {
            totalIncomeThisMonth += income.amount; 
        }
    })
    return totalIncomeThisMonth;
}