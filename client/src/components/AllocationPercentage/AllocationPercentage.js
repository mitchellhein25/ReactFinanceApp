import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

import { getAccountNames } from '../../actions/accountNames';

const AllocationPercentage = () => {
    const [ totalAllocations, setTotalAllocations ] = useState(null);
    const accountNames = useSelector((state) => state.accountNames);

    const classes = useStyles();
    const dispatch = useDispatch();

    async function onLoad() {
        var totalAlloc = 0;
        await accountNames.forEach((acct, index) => {
            totalAlloc += acct.allocation;
        });
        setTotalAllocations(totalAlloc);
    }
    onLoad();

    useEffect(() => {
        dispatch(getAccountNames())
    }, [dispatch]);

    return (
        <Grid>
            <div>
                <Typography align="center" variant="h2">
                Total Allocation Percentage:<br /> <b>{ totalAllocations }%</b>
                </Typography>
            </div>
            <Typography className={classes.red} align="center" variant="h5">
                {totalAllocations > 100 ? "Your allocations exceed 100% of your cash flow!" : ""}
            </Typography>
        </Grid>
)};

export default AllocationPercentage;