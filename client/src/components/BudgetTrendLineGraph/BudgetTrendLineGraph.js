import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { getBudgets } from '../../actions/budgets';
import { getExpenses } from '../../actions/expenses';
import { getBudgetMonthDataObjects } from '../../functions/BudgetMonthDataObjects';
import { formatter } from '../../functions/Formatter';

const BudgetTrendLineGraph = (props) => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses);
    const budgets = useSelector((state) => state.budgets)
    
    var monthDataObjectsAscending = getBudgetMonthDataObjects(expenses, props.budget, budgets, false);
    console.log(monthDataObjectsAscending);
    useEffect(() => {
        dispatch(getExpenses())
        dispatch(getBudgets())
    }, [dispatch]);

    const getAverage = (monthList, valueString) => {
        let yearlySum = 0;
        for (let x = 0; x < monthList.length; x++)
        {
            yearlySum += monthList[x].totalExpenses;
        }
        return yearlySum / monthList.length;
    };

    return (
        <>
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
                <ReferenceLine
                    y={getAverage(monthDataObjectsAscending, "totalExpenses")}
                    stroke="red"
                    strokeDasharray="4 4"
                />
                <Line name={props.budget} type="monotone" dataKey={"totalExpenses"} stroke="blue" dot={true}/>
            </LineChart>
            <p>Average: {formatter.format(getAverage(monthDataObjectsAscending, "totalExpenses"))}</p>
        </>
    );
}

export default BudgetTrendLineGraph;