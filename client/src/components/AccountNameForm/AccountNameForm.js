import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import useStyles from './styles';
import { createAccountName, updateAccountName } from '../../actions/accountNames';

const AccountNameForm = ({ currentId, setCurrentId }) => {
    const [accountNameData, setAccountNameData] = useState({
        name: '', allocation: ''
    });
    const accountName = useSelector((state) => currentId ? state.accountNames.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setAccountNameData({ ...accountNameData, [name]: value });
        formIsValid();  
    }

    const formIsValid = () => {
        const isValid =
            accountNameData.name &&
            accountNameData.allocation;
    
        return isValid;
    };

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
        setAccountNameData({ name: '', allocation: ''});
        setCurrentId(null);
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
                <TextField 
                    size="small" 
                    name="name" 
                    variant="outlined" 
                    label="Name" 
                    type="name" 
                    fullWidth 
                    value={accountNameData.name}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}                 
                />
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} >Allocation</InputLabel>
                    <OutlinedInput 
                        className={classes.inputMargin} 
                        size="small" 
                        name="allocation"
                        variant="outlined" 
                        type="number" 
                        min="0" 
                        max="100" 
                        label="Allocation" 
                        fullWidth 
                        value={accountNameData.allocation}  
                        endAdornment={<InputAdornment position="end">%</InputAdornment>} 
                        onChange={handleInputValue}
                        onBlur={handleInputValue}   
                    />
                        </FormControl>
                <div className={classes.buttonRow} >
                    <div className={classes.formElement}>
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!formIsValid()}>Submit</Button> 
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