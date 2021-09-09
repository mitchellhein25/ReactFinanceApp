import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getAccounts } from '../../actions/accounts';
import { getAccountNames } from '../../actions/accountNames';

const NetWorthLineGraph = ({accounts, accountNames}) => {
    const dispatch = useDispatch();

    const accountNameFindName = (account) => {
        if (account.name && account) {
            const accountName = accountNames.find(accountName => accountName._id === account.name)
            if (accountName) {
                return accountName.name;
            }
        }
        return ""
    }
    
    let acctNames = [];
    let accts = [];
    let uniqueMonthYearPairs = [];
    //key: [month, year], value: [list of accounts]
    let accountsEachMonth = new Map();

    //Find all unique months in the user's accounts list
    accounts.forEach((account, index) => {
        var alreadyPresent = false;
        var currMonth = moment(account.date).month() + 1
        var currYear = moment(account.date).year()
        uniqueMonthYearPairs.forEach((pair, index) => {
            if (pair[0] === currMonth && pair[1] === currYear) {
                alreadyPresent = true;
            }
        })
        if (!alreadyPresent) {
            uniqueMonthYearPairs.push([currMonth, currYear]);
        }
    })

    //Add each unique month,year pair to  map
    uniqueMonthYearPairs.forEach((pair, index) => {
        accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, []);
    })

    uniqueMonthYearPairs.forEach((pair, index) => {
        acctNames = []
        accounts.forEach((account, index) => {
            var accountDate = moment(account.date);
            accountDate.date(accountDate.date() + 1);
            accountDate.date(accountDate.month() + 1);
            if (`${accountDate.month()}, ${moment(account.date).year()}` === `${pair[0]}, ${pair[1]}`){
                if (acctNames.includes(accountNameFindName(account))) {
                    accts.forEach((acct, indexInner) => {
                        if (accountNameFindName(acct) === accountNameFindName(account)) {
                            if (account.date > acct.date) {
                                var list = accountsEachMonth.get(`${pair[0]}, ${pair[1]}`);
                                list.push(account);
                                accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, list);
                                accts[indexInner] = account;
                                acctNames[indexInner] = accountNameFindName(account);
                            } 
                        }
                    })
                } else {
                    var list = accountsEachMonth.get(`${pair[0]}, ${pair[1]}`);
                    list.push(account);
                    accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, list);
                    accts.push(account);
                    acctNames.push(accountNameFindName(account));
                }
            }
        })
    }); 

    accountsEachMonth.forEach((list, month) => {
        if (list.length === 0) {
            delete accountsEachMonth.delete(month);
        }
    });

    // Sort the Months from earliest to most recent
    var accountsEachMonthAscending = new Map([...accountsEachMonth.entries()].sort((a,b) => {
        var aDate = moment().set({month: a[0].match("(.*?),")[1], year: a[0].match(", (.*)")[1]});
        var bDate = moment().set({month: b[0].match("(.*?),")[1], year: b[0].match(", (.*)")[1]});
        return bDate < aDate ?  1 
            : bDate > aDate ? -1 
            : 0;
    }));

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

    var netWorthObjectsAscending = [];
    var netWorthObjectsDescending = [];
    Array.from(accountsEachMonthAscending).map(([key, value]) => (
        netWorthObjectsAscending.push({
            month: key,
            netWorth: calculatedNetWorth(value)[0],
            assets: calculatedNetWorth(value)[1],
            debts: calculatedNetWorth(value)[2]
        })
    ))
    Array.from(accountsEachMonth).map(([key, value]) => (
        netWorthObjectsDescending.push({
            month: key,
            netWorth: calculatedNetWorth(value)[0],
            assets: calculatedNetWorth(value)[1],
            debts: calculatedNetWorth(value)[2]
        })
    ))

    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getAccountNames())
    }, [dispatch]);

    return (
        <LineChart
            width={400}
            height={400}
            data={netWorthObjectsAscending}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
            <XAxis dataKey="month" />
            <YAxis domain={[dataMin => (Math.round(dataMin*.8)), dataMax => (Math.round(dataMax*1.2))]} /> 
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend verticalAlign="top" height={36}/>
            <Line name="Net Worth" type="monotone" dataKey="netWorth" stroke="blue" dot={true}/>
            <Line name="Assets" type="monotone" dataKey="assets" stroke="green"  dot={true}/>
            <Line name="Debts" type="monotone" dataKey="debts" stroke="red"  dot={true}/>
        </LineChart>
    );
}

export default NetWorthLineGraph;