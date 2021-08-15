import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, TextField, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import AccountTable from '../components/AccountTable/AccountTable';
import AccountForm from '../components/AccountForm/AccountForm';
import AccountNameForm from '../components/AccountNameForm/AccountNameForm';
import NetWorth from '../components/NetWorth/NetWorth';

import useStyles from '../styles';

import { getAccounts } from '../actions/accounts';
import { getAccountNames } from '../actions/accountNames';

function Accounts() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentAccountNameId, setcurrentAccountNameId] = useState(null);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getAccounts())
  }, [currentAccountId, dispatch]);

  useEffect(() => {
    dispatch(getAccountNames())
  }, [currentAccountNameId, dispatch]);

if(!user?.result?._id && !user?.result?.googleId) {
  return (
      <Container>
          <Typography variant="h6" align="center">
              Sign in to view your accounts.
          </Typography>
      </Container>
  )
} 

  return (
    <Container maxWidth="none">
      <Grid className={classes.appBar} container justify="space-between" alignItems="stretch" spacing={1}>
      <Grid item xs={12} md={4}></Grid>
      <Grid item xs={12} md={4}>
        <NetWorth />
      </Grid>
      <Grid item xs={12} md={4}></Grid>
        
      </Grid>

      <Grid className={classes.appBar} container justify="space-between" alignItems="stretch" spacing={1}>
        <Grid item xs={12} md={7}>
          <AccountTable currentId={currentAccountId} setCurrentId={setCurrentAccountId} date={date}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <AccountForm currentId={currentAccountId} setCurrentId={setCurrentAccountId} accountNameID={currentAccountNameId}/>
        </Grid>
        <Grid item xs={12} sm={2}>
            <AccountNameForm currentId={currentAccountId} setCurrentId={setCurrentAccountId} accountNameID={currentAccountNameId}/>
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default Accounts;
