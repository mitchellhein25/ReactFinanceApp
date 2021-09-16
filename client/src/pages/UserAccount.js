import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Avatar, Typography, Button, TextField, Input  } from '@material-ui/core';
import useStyles from '../styles';
import { updateName, updateEmail, updatePassword } from '../actions/userAccount';

function UserAccount() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [errors, setErrors] = useState({
        email: "", password: ""
    })
    
    const saveNameChange = () => {
        setEditName(false);
        dispatch(updateName(user));
    }

    const saveEmailChange = () => {
        setEditEmail(false);
        dispatch(updateEmail(user))
        .then(response =>{
            if (response === "A user with that email was not found")
                setErrors({...errors, email: response});
        })
    }

    const savePasswordChange = () => {
        setEditPassword(false)
    }

    return (
        <Container maxWidth="none">
            <Paper elevation={5} className={classes.userPaper}>
                <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.ImageUrl}>{user?.result.name.charAt(0)}</Avatar>
                {editName ? (
                    <>
                        <Typography>New Name:</Typography> 
                        <TextField 
                            key={1}
                            size="small"  
                            name="name" 
                            variant="outlined" 
                            type="text"  
                            value={user.result.name}
                            onChange={(e) => setUser({...user, result: {...user.result, name: e.target.value}})}
                        />
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
                        <Typography>New Email:</Typography>
                        <TextField 
                            key={1}
                            size="small"  
                            name="email" 
                            variant="outlined" 
                            type="email"  
                            value={user.result.email}
                            onChange={(e) => setUser({...user, result: {...user.result, email: e.target.value}})}
                        />
                        <span style={{color: "red", margin: "auto"}}>{errors["email"]}</span>
                        <Button variant="contained" size="small" onClick={saveEmailChange} >Save</Button> 
                    </>
                ) : (
                    <>
                        <Typography>Email: {user.result.email}</Typography>
                        <Button variant="contained" size="small" onClick={() => setEditEmail(true)} >Edit</Button> 
                    </>
                )}
                {editPassword ? (
                    <>
                        <Typography>New Password:</Typography>
                        <Input> {user.result.password}</Input>
                        <Typography>Confirm New Password:</Typography>
                        <Input> {user.result.password}</Input>
                        <Button variant="contained" size="small" onClick={savePasswordChange} >Save</Button> 
                    </>
                ) : (
                    <>
                        <Typography>Password: &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</Typography>
                        <Button variant="contained" size="small" onClick={() => setEditPassword(true)} >Edit</Button>  
                    </>
                )}
                
            </Paper>
        </Container>
    );
}

export default UserAccount;