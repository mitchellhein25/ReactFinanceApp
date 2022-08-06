import moment from 'moment';
import { findUniqueMonths, sortDescending, sortAscending } from './NetWorthObjects';

export function getCashFlowObjects(expenses, incomes, descending) {
    
    let uniqueMonthYearPairs = [];
    uniqueMonthYearPairs = findUniqueMonths(expenses, uniqueMonthYearPairs);

    //key: [month, year], value: [list of accounts]
    let expensesEachMonth = new Map();
    let incomesEachMonth = new Map();
    uniqueMonthYearPairs.forEach((pair, index) => {
        expensesEachMonth.set(`${pair[0]}, ${pair[1]}`, 0);
        incomesEachMonth.set(`${pair[0]}, ${pair[1]}`, 0);
    });

    uniqueMonthYearPairs.forEach((pair, index) => {
        getMonthTotals(expenses, expensesEachMonth, pair);
        getMonthTotals(incomes, incomesEachMonth, pair);
    });

    expensesEachMonth.forEach((value, month) => {
        if (value === 0) {
            delete expensesEachMonth.delete(month);
        }
    });

    var expensesEachMonthAscending = sortAscending(expensesEachMonth);
    var expensesEachMonthDescending = sortDescending(expensesEachMonth);

    var cashFlowObjectsAscending = [];
    var cashFlowObjectsDescending = [];

    return descending
        ? getCashFlowArray(expensesEachMonthDescending, incomesEachMonth, cashFlowObjectsDescending)
        : getCashFlowArray(expensesEachMonthAscending, incomesEachMonth, cashFlowObjectsAscending);

}

function getMonthTotals(list, listEachMonth, pair) {
    list.forEach((listitem, index) => {
        var listDate = moment(listitem.date);
        listDate.date(listDate.date() + 1);
        listDate.date(listDate.month() + 1);
        if (`${listDate.month()}, ${moment(listitem.date).year()}` === `${pair[0]}, ${pair[1]}`){
            var curr = listEachMonth.get(`${pair[0]}, ${pair[1]}`);
            listEachMonth.set(`${pair[0]}, ${pair[1]}`, curr + listitem.amount);
        }
    });
}

function getCashFlowArray(listEachMonth, incomesEachMonth, finalArray) {
    Array.from(listEachMonth).map(([key, value]) => (
        finalArray.push({
            month: key,
            cashFlow: incomesEachMonth.get(key) - value,
            incomes: incomesEachMonth.get(key),
            expenses: value
        })
    ))
    return finalArray;
}