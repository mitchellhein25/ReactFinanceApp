import moment from 'moment';
import { BudgetMonthData } from '../objects/budgetMonthData';

export function getBudgetMonthDataObjects(expenses, budget, budgets, descending) {
    
    let monthDataList = findUniqueMonths(expenses)

    monthDataList = buildMonthDataEachMonth(expenses, budget, budgets, monthDataList);
    return descending 
        ? getDataArray(sortMonthData(monthDataList, true))
        : getDataArray(sortMonthData(monthDataList, false));
}

//Find all unique months in the list
export function findUniqueMonths(list) {
    let monthDataList = [];
    let uniqueMonthYearPairs = new Set();
    list.forEach((listItem, index) => {
        var currMonth = moment(listItem.date).month() + 1
        var currYear = moment(listItem.date).year()
        let monthYearPair = currMonth + '-' + currYear;
        if (!uniqueMonthYearPairs.has(monthYearPair)) {
            uniqueMonthYearPairs.add(monthYearPair);
            let monthData = new BudgetMonthData(currMonth, currYear);
            monthDataList.push(monthData);
        }
    });
    return monthDataList;
}

function buildMonthDataEachMonth(expenses, budget, budgets, monthDataList) {
    monthDataList.forEach((pair, index) => {
        let thisMonthsExpensesList = expenses.filter(item => {
            let currDate = moment.utc(item.date);
            currDate.day = currDate.day + 1;
            return currDate.month() + 1 === pair.month 
                && currDate.year() === pair.year 
                && budgetsFindName(item.category, budgets) === budget;
        });
        thisMonthsExpensesList.forEach((item, index) => { 
            pair.totalExpenses += item.amount;
        });
    }); 

    return monthDataList;
}

const budgetsFindName = (budget, allBudgets) => {
    if (budget && budget) {
        const budgetObj = allBudgets.find(budgetObj => budgetObj._id === budget);
        if (budgetObj) {
            return budgetObj.name;
        }
    }
    return ""
}

export function sortMonthData(monthDataList, descending) {
    monthDataList.sort((a,b) => {
        var aDate = moment().set({month: a.month, year: a.year});
        var bDate = moment().set({month: b.month, year: b.year});
        if (!descending) {
            return bDate < aDate ?  1 
                : bDate > aDate ? -1 
                : 0;
        } else {
            return bDate > aDate ?  1 
                : bDate < aDate ? -1 
                : 0;
        }
    });
    return monthDataList;
}

function getDataArray(monthDataList) {
    let finalArray = []
    monthDataList.forEach(monthData => {
        finalArray.push({
            month: monthData.month + '-' + monthData.year,
            totalExpenses: monthData.totalExpenses
        });
    })
    return finalArray;
}