import React, { useState } from 'react';
import { Button, Drawer, Table, TableBody, TableCell, TableContainer ,TableRow, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAccountName } from '../../actions/accountNames';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AccountNameForm from '../AccountNameForm/AccountNameForm';
import useStyles from './styles';

const AccountDrawer = ({}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({right: false,});
    const accountNames = useSelector((state) => state.accountNames)
    const [accountNameId, setAccountNameId] = useState(null);
    const classes = useStyles();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setState({ ...state, [anchor]: open });
    };
    return <React.Fragment key="right">
        <div align="center">
            <Button size="small" variant="contained" color="primary" onClick={toggleDrawer("right", true)}>Edit Account Names</Button>
        </div>
        <div >
        <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
            <TableContainer className={classes.padding}>
                <Typography align="center" variant="h4">
                    Account Names 
                </Typography>
                <Table padding="none" aria-label="simple table">
                    <TableBody>
                        {accountNames.map((accountName) => (
                            <TableRow key={accountName._id}>
                                <div hidden>
                                    <TableCell>{accountName._id}</TableCell>
                                </div>
                                <TableCell >{accountName.name}</TableCell>
                                <TableCell>{accountName.allocation}%</TableCell>
                                <TableCell >
                                    <Button size="small" color="primary" onClick={() => dispatch(deleteAccountName(accountName._id))}>
                                        <DeleteIcon fontSize="small" />
                                        Delete
                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button size="small" color="primary" onClick={() => setAccountNameId(accountName._id)}>
                                        <EditIcon fontSize="small" />
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AccountNameForm currentId={accountNameId} setCurrentId={setAccountNameId}></AccountNameForm>
        </Drawer>
        </div>
    </React.Fragment>
    
}

export default AccountDrawer;