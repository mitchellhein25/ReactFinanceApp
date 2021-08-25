import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Drawer, Table, TableBody, TableCell, TableContainer ,TableRow, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { deleteIncomeCat } from '../../actions/incomeCats';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IncomeCatForm from '../IncomeCatForm/IncomeCatForm';
import useStyles from './styles';

const IncomeDrawer = ({}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({right: false,});
    const incomeCats = useSelector((state) => state.incomeCats)
    const [incomeCatId, setIncomeCatId] = useState(null);
    const classes = useStyles();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };
    return <React.Fragment key="right">
        <div align="center">
            <Button size="small" variant="contained" color="primary" onClick={toggleDrawer("right", true)}>Edit Income Categories</Button>
        </div>
        <div >
        <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
            <ArrowBackIcon className={classes.backArrow} onClick={toggleDrawer("right", false)}></ArrowBackIcon>
            <TableContainer className={classes.padding}>
                <Typography align="center" variant="h4">
                    Income Categories 
                </Typography>
                <Table padding="none" aria-label="simple table">
                    <TableBody>
                        {incomeCats.map((incomeCat) => (
                            <TableRow key={incomeCat._id}>
                                <div hidden>
                                    <TableCell>{incomeCat._id}</TableCell>
                                </div>
                                <TableCell >{incomeCat.name}</TableCell>
                                <TableCell >
                                    <Button size="small" color="primary" onClick={() => dispatch(deleteIncomeCat(incomeCat._id))}>
                                        <DeleteIcon fontSize="small" />
                                        Delete
                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button size="small" color="primary" onClick={() => setIncomeCatId(incomeCat._id)}>
                                        <EditIcon fontSize="small" />
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <IncomeCatForm currentId={incomeCatId} setCurrentId={setIncomeCatId}></IncomeCatForm>
        </Drawer>
        </div>
    </React.Fragment>
    
}

export default IncomeDrawer;