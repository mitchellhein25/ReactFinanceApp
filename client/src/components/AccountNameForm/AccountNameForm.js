import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector  } from 'react-redux';
import { createAccountName, updateAccountName } from '../../actions/accountNames';

const AccountNameForm = ({ currentId, setCurrentId }) => {
    const [accountNameData, setAccountNameData] = useState({
        name: ''
    });
    const accountName = useSelector((state) => currentId ? state.accountNames.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(accountName) setAccountNameData(accountName);
    }, [accountName])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateAccountName(currentId, accountNameData));
        } else {
            dispatch(createAccountName(accountNameData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setAccountNameData({ name: '' });
    }

    if(!user?.result?._id && !user?.result?.googleId) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Sign in to add your account names.
                </Typography>
            </Container>
        )
    }

    return (
        <div className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Account Name</Typography>
                <TextField size="small" name="name" variant="outlined" label="Name" type="name" fullWidth value={accountNameData.name}
                //This ... spreads the data, only changing the property you specify and leaving the others as is
                //Sets the state using an object
                onChange={(e) => setAccountNameData({ ...accountNameData, name: e.target.value })}
                />
                <div className={classes.buttonRow} >
                    <div className={classes.formElement}>
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    </div>
                    <div className={classes.formElement}>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AccountNameForm;