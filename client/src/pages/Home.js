import React, { useState, useEffect } from 'react';
import { Container, Grid, Tab, Tabs, Box, Typography, useMediaQuery } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from '../styles';

import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable/ExpenseTable';
import IncomeForm from '../components/IncomeForm/IncomeForm';
import IncomeTable from '../components/IncomeTable/IncomeTable';
import BudgetForm from '../components/BudgetForm/BudgetForm';
import BudgetTable from '../components/BudgetTable/BudgetTable';
import IncomeCatForm from '../components/IncomeCatForm/IncomeCatForm';
import HomeTotals from '../components/HomeTotals/HomeTotals';
import DatePicker from '../components/DatePicker/DatePicker';
import NetWorth from '../components/NetWorth/NetWorth';
import BudgetTotals from '../components/BudgetTotals/BudgetTotals';
import IncomeDrawer from '../components/IncomeDrawer/IncomeDrawer';

import { getExpenses } from '../actions/expenses';
import { getIncomes } from '../actions/incomes';
import { getBudgets } from '../actions/budgets';
import { getIncomeCats } from '../actions/incomeCats';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

function Home() {
    const [currentExpenseId, setCurrentExpenseId] = useState();
    const [currentIncomeId, setCurrentIncomeId] = useState();
    const [currentBudgetId, setCurrentBudgetId] = useState();
    const [currentIncomeCatId, setCurrentIncomeCatId] = useState();
    const [date, setDate] = useState(new Date());
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(() => {
        dispatch(getExpenses());
        dispatch(getIncomes());
        dispatch(getBudgets());
        dispatch(getIncomeCats());
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?._id && !user?.result?.googleId) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Sign in to view your expenses, incomes, and budgets.
                </Typography>
            </Container>
        )
    } 

    return (
        <Container style={{ margin: 'auto' }} maxWidth="none">
            <Grid className={classes.appBar} container justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item xs={12} md={4}>
                    <NetWorth />
                </Grid>
                <Grid style={isMobile ? {padding:'15px 0'} : {}} item xs={12} md={4}>
                    <DatePicker date={date} setDate={setDate}/>
                </Grid>
                <Grid style={isMobile ? {borderBottom: 'solid black 2px', padding:'15px 0'} : {}} item xs={12} md={4}>
                    <HomeTotals date={date}/>
                </Grid>
                <Grid className={classes.tabGrid} container justifyContent="space-between" alignItems="center" spacing={1}>
                    <Grid item xs={12} md={2}></Grid>
                    <Grid item xs={12} md={8}>
                        <Tabs className={classes.tabs} value={value} onChange={handleChange} centered>
                            <Tab label="Expenses" {...a11yProps(0)} />
                            <Tab label="Incomes" {...a11yProps(1)} />
                            <Tab label="Budgets" {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} md={2}></Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <Grid className={classes.appBar} container direction={isMobile ? 'column-reverse' : 'row'} justifyContent="space-between" alignItems="stretch" spacing={1}>
                        <Grid item xs={12} md={7}>
                            <ExpenseTable setCurrentId={setCurrentExpenseId} date={date}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ExpenseForm currentId={currentExpenseId} setCurrentId={setCurrentExpenseId} budgetID={currentBudgetId}/>
                        </Grid>
                        <Grid id="budgets" item xs={12} md={2}>
                            <BudgetForm currentId={currentBudgetId} setCurrentId={setCurrentBudgetId} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid className={classes.appBar} container direction={isMobile ? 'column-reverse' : 'row'} justifyContent="space-between" alignItems="stretch" spacing={1}>
                        <Grid item xs={12} md={7}>
                            <IncomeTable setCurrentId={setCurrentIncomeId} date={date}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <IncomeForm currentId={currentIncomeId} setCurrentId={setCurrentIncomeId} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <IncomeDrawer></IncomeDrawer>
                            <IncomeCatForm currentId={currentIncomeCatId} setCurrentId={setCurrentIncomeCatId} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel className={classes.fullPanel} value={value} index={2}>
                    <Grid className={classes.appBar} container direction={isMobile ? 'column-reverse' : 'row'} justifyContent="center" alignItems="stretch" spacing={2}>
                        <Grid item xs={12} md={9}>
                            <BudgetTable setCurrentId={setCurrentBudgetId} date={date}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <BudgetForm currentId={currentBudgetId} setCurrentId={setCurrentBudgetId} />
                            <BudgetTotals date={date}/>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Grid>
        </Container>
    )
}

export default Home;