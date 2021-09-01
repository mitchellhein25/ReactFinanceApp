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
import InfoModal from '../components/InfoModal/InfoModal';

function Accounts() {
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [currentAccountNameId, setCurrentAccountNameId] = useState(null);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const accountModalHeader = "How to Handle Accounts";
  const accountInfoButtonText = "How to Handle Accounts";
  const accountModalText = ( 
      <p id="simple-modal-description">
          <span style={{fontSize:"20px"}}>1. Add your Account Names using the Account Name Form.</span><br></br><br></br>
          - Each account name should be given an Allocation amount.<br></br>
          &nbsp;&nbsp;&nbsp;* The <b>Allocation</b> is the percentage of your left over income each month that you want to put towards that account.<br></br>
          &nbsp;&nbsp;&nbsp;* Ex: If your total budgets equal $2,000 and you spend $1,000, you will have $1,000 left over for the month.<br></br>
          If the allocation of an account is set to 50%, then $500 will be allocated with this example.<br></br><br></br>
          <span style={{fontSize:"20px"}}>2. Add your Accounts using the Account Form.</span><br></br><br></br>
          - Update your account balances each month, this is how your Net Worth is calculated.<br></br>
          &nbsp;&nbsp;&nbsp;* Net Worth is all of your Asset accounts minus all of your Debt accounts.<br></br>
          - Date, Name, and Balance are required.<br></br>
      </p>
      )

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
      <Grid style={{ marginTop: '20px' }} container justifyContent="center">
        <InfoModal 
            modalHeader={accountModalHeader} 
            infoButtonText={accountInfoButtonText}
            modalText={accountModalText}
        />
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
