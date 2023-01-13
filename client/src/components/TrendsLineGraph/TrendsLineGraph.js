import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getAccounts } from '../../actions/accounts';
import { getAccountNames } from '../../actions/accountNames';
import { getExpenses } from '../../actions/expenses';
import { getIncomes } from '../../actions/incomes';
import { getMonthDataObjects } from '../../functions/MonthDataObjects';

const NetWorthLineGraph = (props) => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const accountNames = useSelector((state) => state.accountNames)
    const expenses = useSelector((state) => state.expenses);
    const incomes = useSelector((state) => state.incomes);
    const isCashFlow = props.type == "cash_flow";
    
    var monthDataObjectsAscending = getMonthDataObjects(accounts, expenses, incomes, accountNames, false);

    useEffect(() => {
        dispatch(getExpenses())
        dispatch(getIncomes())
        dispatch(getAccounts())
        dispatch(getAccountNames())
    }, [dispatch]);

    return (
        <LineChart
            width={400}
            height={400}
            data={monthDataObjectsAscending}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
            <XAxis dataKey="month" />
            <YAxis domain={[dataMin => (Math.round(dataMin*.8)), dataMax => (Math.round(dataMax*1.2))]} /> 
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend verticalAlign="top" height={36}/>
            <Line name={isCashFlow ? "Cash Flow" : "Net Worth"} type="monotone" dataKey={isCashFlow ? "cashFlow" : "netWorth"} stroke="blue" dot={true}/>
            <Line name={isCashFlow ? "Income" : "Assets"} type="monotone" dataKey={isCashFlow ? "totalIncome" : "assets"} stroke="green"  dot={true}/>
            <Line name={isCashFlow ? "Expenses" : "Debts"} type="monotone" dataKey={isCashFlow ? "totalExpenses" : "debts"} stroke="red"  dot={true}/>
        </LineChart>
    );
}

export default NetWorthLineGraph;