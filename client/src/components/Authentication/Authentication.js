import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {createBrowserHistory} from 'history';
import { signin, signup } from '../../actions/auth';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';
// import Icon from './Icon';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const Authentication = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = createBrowserHistory({forceRefresh:true});
    const [errors, setErrors] = useState({
        email: "", password: ""
    })
    const classes = useStyles();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            if (formData.password !== formData.confirmPassword) {
                setErrors({...errors, confirmPassword: "The password's do not match."})
                return 
            }
            dispatch(signup(formData, history))
            .then(response => setErrors(response));
        } else {    
            dispatch(signin(formData, history))
            .then(response =>{
                console.log(response)
                if (response === "Password is not correct.")
                    setErrors({...errors, password: response})
                else if (response === "A user with that email was not found")
                    setErrors({...errors, email: response})
            });
        }
    }
    
    const handleChange = (e) => {
        setErrors({...errors, password: "", email: "", confirmPassword: ""})
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    // const googleSuccess = async (res) => {
    //     // ?. is Special optional chaining operator that will not throw error if res is not available
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     setFormData({ firstName: result.givenName, lastName: result.familyName, email: result.email, password: null, confirmPassword: null });

    //     if(isSignUp) {
    //         dispatch(signup(formData, history));
    //     } else {    
    //         dispatch(signin(formData, history));
    //     }

    //     try {
    //         dispatch({type: 'AUTH', data: {result, token}});

    //         history.push('/');
    //     } catch (error){
    //         console.log(error);
    //     }
    // };

    // const googleFailure = () => {
    //     console.log("Google sign in was unsuccessful. Try again later.");
    // };
            
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input half autoFocus name="firstName" label="First Name" handleChange={handleChange}/>
                                <Input half name="lastName" label="Last Name" handleChange={handleChange}/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <span style={{color: "red", margin: "auto"}}>{errors["email"]}</span>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            <span style={{color: "red", margin: "auto"}}>{errors["password"]}</span>
                        { isSignUp && (
                            <>
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                                <span style={{color: "red", margin: "auto"}}>{errors["confirmPassword"]}</span>
                            </>
                          )}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> 
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    {/* <GoogleLogin 
                        clientId="271210804174-p43rqums9bp56nvvmunsgh09n43eee76.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained">
                               {isSignUp ? "Sign Up with Google Account" : "Google Sign In"} 
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? "Already have an account? Sign In." : "Don't have an account? Sign Up."}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );

}

export default Authentication;