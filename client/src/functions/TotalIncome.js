import moment from 'moment';

export function totalIncome(incomes, date) {
    var totalIncomeThisMonth = 0;
    const momentDate = moment(date);
    const addOneDateMonth = (income) => {
        var incomeDate = moment(income.date);
        incomeDate.date(incomeDate.date() + 1);
        return incomeDate.month()
      }
    const addOneDateYear = (income) => {
        var incomeDate = moment(income.date);
        incomeDate.date(incomeDate.date() + 1);
        return incomeDate.year()
    }
    incomes.forEach((income, index) => {
        if (addOneDateMonth(income) === momentDate.month() && addOneDateYear(income) === momentDate.year()) {
            totalIncomeThisMonth += income.amount; 
        }
    })
    return totalIncomeThisMonth;
}