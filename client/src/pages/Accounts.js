import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, TextField, Paper } from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { useDispatch } from 'react-redux';

import AccountTable from '../components/AccountTable/AccountTable';
import AccountForm from '../components/AccountForm/AccountForm';

import useStyles from '../styles';

import { getAccounts } from '../actions/accounts';
import { getAccountNames } from '../actions/accountNames';

function Accounts() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentAccountNameId, setcurrentAccountNameId] = useState(null);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAccounts())
  }, [currentAccountId, dispatch]);

  useEffect(() => {
    dispatch(getAccountNames())
}, [currentAccountNameId, dispatch]);

  return (
    <Container maxWidth="none">
      <Grid className={classes.appBar} container justify="space-between" alignItems="stretch" spacing={1}>
        <Grid item xs={12} sm={7}>
          <AccountTable currentId={currentAccountId} setCurrentId={setCurrentAccountId} date={date}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <AccountForm currentId={currentAccountId} setCurrentId={setCurrentAccountId} accountNameID={currentAccountNameId}/>
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default Accounts;
