import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Grid, useMediaQuery } from '@material-ui/core';
import useStyles from '../styles';
import AccountTable from '../components/AccountTable/AccountTable';
import AccountForm from '../components/AccountForm/AccountForm';
import AccountNameForm from '../components/AccountNameForm/AccountNameForm';
import NetWorth from '../components/NetWorth/NetWorth';
import AccountDrawer from '../components/AccountDrawer/AccountDrawer';
import DatePicker from '../components/DatePicker/DatePicker';
import { getAccounts } from '../actions/accounts';
import { getAccountNames } from '../actions/accountNames';

function Accounts() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentAccountNameId, setCurrentAccountNameId] = useState(null);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getAccounts())
    dispatch(getAccountNames())
  }, [currentAccountId, dispatch]);

  const user = JSON.parse(localStorage.getItem('profile'));

  if(!user?.result?._id && !user?.result?.googleId) {
      return (
          <Container>
              <Typography variant="h6" align="center">
                  Sign in to view your Accounts.
              </Typography>
          </Container>
      )
  } 

  return (
    <Container style={{ margin: 'auto' }} maxWidth="none">
      <Grid className={classes.appBar} container justifyContent="space-between" alignItems="stretch" spacing={1}>
        <Grid item xs={12} md={6}>
          <NetWorth />
        </Grid>
        <Grid style={isMobile ? {padding:'15px 0'} : {}} item xs={12} md={6}>
          <DatePicker date={date} setDate={setDate}/>
        </Grid>
      </Grid>
      <Grid className={classes.appBar} container direction={isMobile ? 'column-reverse' : 'row'} justifyContent="space-between" alignItems="stretch" spacing={1}>
        <Grid item xs={12} md={7}>
          <AccountTable setCurrentId={setCurrentAccountId} date={date}/>
        </Grid>
        <Grid item xs={12} sm={3}>
            <AccountForm currentId={currentAccountId} setCurrentId={setCurrentAccountId}/>
        </Grid>
        <Grid item xs={12} sm={2}>
            <AccountDrawer />
            <AccountNameForm currentId={currentAccountNameId} setCurrentId={setCurrentAccountNameId}/>
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default Accounts;
