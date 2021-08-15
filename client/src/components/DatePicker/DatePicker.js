import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

import useStyles from './styles';
import moment from 'moment';

const HomeTotals = ({ date, setDate }) => {
    const momentDate = moment(date);
    const classes = useStyles();
            
    return (
        <>
        
                <Typography className={classes.totals} variant="h2">
                    {momentDate.format("MMMM YYYY")}
                </Typography>
            <Grid item xs={12} md={4} margin="auto">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={new Date('2000-01-01')}
                    maxDate={new Date('2050-12-12')}
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                        // console.log(date);
                    }}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        margin="normal"
                        helperText={null}
                        variant="standard"
                        />
                    )}
                />
                </LocalizationProvider>
            </Grid>
        </>
    );

}

export default HomeTotals;