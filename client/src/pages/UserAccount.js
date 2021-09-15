import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Avatar, Typography, Button, Input  } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../styles';

function UserAccount() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    useEffect(() => {

    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('profile'));
    
    const saveNameChange = () => {
        setEditName(false);
    }

    const saveNameEmail = () => {
        setEditEmail(false)
    }

    // if(!user?.result?._id && !user?.result?.googleId) {
    //     return (
    //         <Container>
    //             <Typography variant="h6" align="center">
    //                 Sign in to view your trends.
    //             </Typography>
    //         </Container>
    //     )
    // }  

    return (
        <Container maxWidth="none">
            <Paper elevation={3} className={classes.userPaper}>
                <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.ImageUrl}>{user?.result.name.charAt(0)}</Avatar>
                {editName ? (
                    <>
                    <Input>Name: {user.result.name}</Input>
                    <Button variant="contained" size="small" onClick={saveNameChange} >Save</Button> 
                    </>
                ) : (
                    <>
                    <Typography>Name: {user.result.name}</Typography>
                    <Button variant="contained" size="small" onClick={() => setEditName(true)} >Edit</Button> 
                    </>
                )}
                {editEmail ? (
                    <>
                    <Input>Name: {user.result.email}</Input>
                    <Button variant="contained" size="small" onClick={saveNameEmail} >Save</Button> 
                    </>
                ) : (
                    <>
                    <Typography>Name: {user.result.email}</Typography>
                    <Button variant="contained" size="small" onClick={() => setEditEmail(true)} >Edit</Button> 
                    </>
                )}
                <Typography>Password: &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</Typography>
                <Button variant="contained" size="small" onClick={""} >Edit</Button> 
            </Paper>
        </Container>
    );
}

export default UserAccount;