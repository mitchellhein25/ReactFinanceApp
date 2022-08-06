import moment from 'moment';

const addOneDate = (expense) => {
  var expenseDate = moment(expense.date);
  expenseDate.date(expenseDate.date() + 1);
  return expenseDate
}

export function filterListByCurrentMonth(list, momentDate) {
    return list.filter(listItem => addOneDate(listItem).month() === momentDate.month() && addOneDate(listItem).year() === momentDate.year());
  }