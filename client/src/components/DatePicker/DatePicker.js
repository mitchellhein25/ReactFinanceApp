import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import useStyles from './styles';
import moment from 'moment';

const HomeTotals = ({ date, setDate }) => {
    const momentDate = moment(date);
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item xs={12}>
                    <Typography className={classes.totals} variant="h2">
                            {momentDate.format("MMMM YYYY")}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker 
                            value={date} 
                            onChange={(newDate) => {setDate(newDate);}} 
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            // label="Year and Month"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </>
    );

}

export default HomeTotals;