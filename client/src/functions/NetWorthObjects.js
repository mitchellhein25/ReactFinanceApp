import moment from 'moment';

export function getNetWorthObjects(accounts, accountNames, descending) {
    
    let uniqueMonthYearPairs = [];
    uniqueMonthYearPairs = findUniqueMonths(accounts, uniqueMonthYearPairs);

    //key: [month, year], value: [list of accounts]
    let accountsEachMonth = new Map();
    uniqueMonthYearPairs.forEach((pair, index) => {
        accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, []);
    });

    accountsEachMonth = buildAccountsEachMonth(uniqueMonthYearPairs, accounts, accountsEachMonth, accountNames);

    accountsEachMonth.forEach((list, month) => {
        if (list.length === 0) {
            delete accountsEachMonth.delete(month);
        }
    });

    var accountsEachMonthAscending = sortAscending(accountsEachMonth);
    var accountsEachMonthDescending = sortDescending(accountsEachMonth); 

    var netWorthObjectsAscending = [];
    var netWorthObjectsDescending = [];

    return descending 
        ? getNetWorthArray(accountsEachMonthDescending, netWorthObjectsDescending, calculatedNetWorth)
        : getNetWorthArray(accountsEachMonthAscending, netWorthObjectsAscending, calculatedNetWorth);
}

//Find all unique months in the list
export function findUniqueMonths(list, uniqueMonthYearPairs) {
    list.forEach((listItem, index) => {
        var alreadyPresent = false;
        var currMonth = moment(listItem.date).month() + 1
        var currYear = moment(listItem.date).year()
        if (listItem.date) {
            if (listItem.date.includes("-11-")) {
                currMonth = 9;
            }
        }
        uniqueMonthYearPairs.forEach((pair, index) => {
            if (pair[0] === currMonth && pair[1] === currYear) {
                alreadyPresent = true;
            }
        })
        if (!alreadyPresent) {
            uniqueMonthYearPairs.push([currMonth, currYear]);
        }
    })
    return uniqueMonthYearPairs;
}

function buildAccountsEachMonth(uniqueMonthYearPairs, accounts, accountsEachMonth, accountNames) {
    uniqueMonthYearPairs.forEach((pair, index) => {
        var acctNames = [];
        var accts = [];
        accounts.forEach((account, index) => {
            var accountDate = moment(account.date);
            accountDate.date(accountDate.date() + 1);
            accountDate.date(accountDate.month() + 1);
            if (`${accountDate.month()}, ${moment(account.date).year()}` === `${pair[0]}, ${pair[1]}`){
                if (acctNames.includes(accountNameFindName(account, accountNames))) {
                    accts.forEach((acct, indexInner) => {
                        if (accountNameFindName(acct, accountNames) === accountNameFindName(account, accountNames)) {
                            if (account.date > acct.date) {
                                var list = accountsEachMonth.get(`${pair[0]}, ${pair[1]}`);
                                list.push(account);
                                accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, list);
                                accts[indexInner] = account;
                                acctNames[indexInner] = accountNameFindName(account, accountNames);
                            } 
                        }
                    })
                } else {
                    var list = accountsEachMonth.get(`${pair[0]}, ${pair[1]}`);
                    list.push(account);
                    accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, list);
                    accts.push(account);
                    acctNames.push(accountNameFindName(account, accountNames));
                }
            }
        });
    }); 

    return accountsEachMonth
}

const accountNameFindName = (account, accountNames) => {
    if (account.name && account) {
        const accountName = accountNames.find(accountName => accountName._id === account.name)
        if (accountName) {
            return accountName.name;
        }
    }
    return ""
}

export function sortAscending(listEachMonth) {
    return new Map([...listEachMonth.entries()].sort((a,b) => {
        var aDate = moment().set({month: a[0].match("(.*?),")[1], year: a[0].match(", (.*)")[1]});
        var bDate = moment().set({month: b[0].match("(.*?),")[1], year: b[0].match(", (.*)")[1]});
        return bDate < aDate ?  1 
            : bDate > aDate ? -1 
            : 0;
    }));
}

export function sortDescending(listEachMonth) {
    return new Map([...listEachMonth.entries()].sort((a,b) => {
        var aDate = moment().set({month: a[0].match("(.*?),")[1], year: a[0].match(", (.*)")[1]});
        var bDate = moment().set({month: b[0].match("(.*?),")[1], year: b[0].match(", (.*)")[1]});
        return bDate > aDate ?  1 
            : bDate < aDate ? -1 
            : 0;
    }));
}

function getNetWorthArray(listEachMonth, finalArray, calculateFunction) {
    Array.from(listEachMonth).map(([key, value]) => (
        finalArray.push({
            month: key,
            netWorth: calculateFunction(value)[0],
            assets: calculateFunction(value)[1],
            debts: calculateFunction(value)[2]
        })
    ))
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