import moment from 'moment';
import { MonthData } from '../objects/monthData';

export function getMonthDataObjects(accounts, expenses, incomes, accountNames, descending) {
    
    let monthDataList = findUniqueMonths([accounts, expenses, incomes])

    monthDataList = buildMonthDataEachMonth(accounts, expenses, incomes, accountNames, monthDataList);

    return descending 
        ? getDataArray(sortMonthData(monthDataList, true), calculatedNetWorth)
        : getDataArray(sortMonthData(monthDataList, false), calculatedNetWorth);
}

//Find all unique months in the list
export function findUniqueMonths(lists) {
    let monthDataList = [];
    let uniqueMonthYearPairs = new Set();
    lists.forEach((list, indexOuter) => {
        list.forEach((listItem, index) => {
            var currMonth = moment(listItem.date).month() + 1
            var currYear = moment(listItem.date).year()
            let monthYearPair = currMonth + '-' + currYear;
            if (!uniqueMonthYearPairs.has(monthYearPair)) {
                uniqueMonthYearPairs.add(monthYearPair);
                let monthData = new MonthData(currMonth, currYear);
                monthDataList.push(monthData);
            }
        });
    });
    return monthDataList;
}

function buildMonthDataEachMonth(accounts, expenses, incomes, accountNames, monthDataList) {
    monthDataList.forEach((pair, index) => {
        var acctNames = [];
        var accts = [];
        let thisMonthsAccountsList = accounts.filter(act => 
            moment.utc(act.date).month() + 1 == pair.month 
                && moment.utc(act.date).year() == pair.year
        );
        thisMonthsAccountsList.forEach((account, index) => {
            let accountName = accountNameFindName(account, accountNames);
            if (acctNames.includes(accountName)) {
                accts.forEach((acct, indexInner) => {
                    if (accountNameFindName(acct, accountNames) === accountName) {
                        if (moment(account.date) > moment(acct.date)) {
                            pair.accounts = pair.accounts.filter(item => 
                                accountNameFindName(item, accountNames) !== accountName);
                            pair.accounts.push(account);
                            accts[indexInner] = account;
                            acctNames[indexInner] = accountNameFindName(account, accountNames);
                        } 
                    }
                });
            } else {
                pair.accounts.push(account);
                accts.push(account);
                acctNames.push(accountNameFindName(account, accountNames));
            }
        });
        
        let thisMonthsExpensesList = expenses.filter(item => {
            let currDate = moment.utc(item.date);
            currDate.day = currDate.day + 1;
            return currDate.month() + 1 == pair.month 
                && currDate.year() == pair.year;
        });
        thisMonthsExpensesList.forEach((item, index) => { 
            pair.totalExpenses += item.amount;
        });
        let thisMonthsIncomesList = incomes.filter(item => {
            let currDate = moment.utc(item.date);
            currDate.hour = 12;
            return currDate.month() + 1 == pair.month 
                && currDate.year() == pair.year;
         });
        thisMonthsIncomesList.forEach((item, index) => { 
            pair.totalIncome += item.amount;
        });
    }); 
    monthDataList = monthDataList.map(item => {
        if (item.accounts.length === 0) {
            let prevMonthData = monthDataList.find(function(x) { 
                let checkMonth = item.month - 1;
                let checkYear = item.year;
                if (checkMonth === 0) {
                    checkMonth = 12;
                    checkYear = checkYear - 1;
                }
                return x.month === checkMonth && x.year === checkYear;
            });
            console.log(prevMonthData);
            if (prevMonthData && prevMonthData.accounts.length !== 0) {
                item.accounts = prevMonthData.accounts;
            } 
            return item;
        } else {
            return item;
        }
    });

    return monthDataList;
}

const accountNameFindName = (account, accountNames) => {
    if (account && account.name) {
        const accountName = accountNames.find(accountName => accountName._id === account.name)
        if (accountName) {
            return accountName.name;
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

function getDataArray(monthDataList, calculateFunction) {
    let finalArray = []
    monthDataList.forEach(monthData => {
        finalArray.push({
            month: monthData.month + '-' + monthData.year,
            netWorth: calculateFunction(monthData.accounts)[0],
            assets: calculateFunction(monthData.accounts)[1],
            debts: calculateFunction(monthData.accounts)[2],
            cashFlow: monthData.totalIncome - monthData.totalExpenses,
            totalIncome: monthData.totalIncome,
            totalExpenses: monthData.totalExpenses
        });
    })
    return finalArray;
}
//Calculate Net Worth 
const calculatedNetWorth = (accts) => {
    var assets = 0;
    var debts = 0;
    var netWorth = 0;

    //Iterate through accounts if it is an asset add if debts delete
    accts.forEach((acct, index) => {
        if (acct.debtOrAsset === true) {
            assets += acct.balance;
        } else {
            debts += acct.balance;
        }
    })
    netWorth = assets - debts;
    return [netWorth, assets, debts];
}