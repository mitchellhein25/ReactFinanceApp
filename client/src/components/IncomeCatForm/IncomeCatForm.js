import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
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

    useEffect(() => {
        if(incomeCat) setIncomeCatData(incomeCat);
    }, [incomeCat])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateIncomeCat(currentId, incomeCatData));
        } else {
            dispatch(createIncomeCat(incomeCatData));
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
                <div>
                    <Button className={classes.formElement} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    <Button className={classes.formElement} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                </div>
            </form>
        </div>
    );
}

export default IncomeCatForm;