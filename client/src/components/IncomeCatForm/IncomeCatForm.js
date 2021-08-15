import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector  } from 'react-redux';
import { createIncomeCat, updateIncomeCat } from '../../actions/incomeCats';

const IncomeCatForm = ({ currentId, setCurrentId }) => {
    const [incomeCatData, setIncomeCatData] = useState({
        name: ''
    });
    const incomeCat = useSelector((state) => currentId ? state.incomeCats.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(incomeCat) setIncomeCatData(incomeCat);
    }, [incomeCat])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateIncomeCat(currentId, { ...incomeCatData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
        } else {
            dispatch(createIncomeCat({ ...incomeCatData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setIncomeCatData({ name: '' });
    }

    return (
        <div className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Income Category</Typography>
                <TextField size="small" name="name" variant="outlined" label="Name" type="name" fullWidth value={incomeCatData.name}
                //This ... spreads the data, only changing the property you specify and leaving the others as is
                //Sets the state using an object
                onChange={(e) => setIncomeCatData({ ...incomeCatData, name: e.target.value })}
                />
                <div className={classes.buttonRow} >
                    <div className={classes.formElement} >
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    </div>
                    <div className={classes.formElement} >
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                    </div>
                </div>
            </form>
        </div>
    );
}

export default IncomeCatForm;