import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Button, Typography, Avatar, useMediaQuery, Drawer, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useHistory } from "react-router-dom";
import decode from 'jwt-decode';
import useStyles from './styles';


const NavBar = ({}) => {
  const classes = useStyles();
  const [state, setState] = useState({right: false,});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  }, [dispatch, history]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      
      //Gets token expiration in ms and current time in ms
      if (decodedToken.exp * 1000 < new Date().getTime()) 
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, logout]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
};

// console.log(user);
  return (
    <div>
      <AppBar position="static">
          {isMobile ? 
          ( 
            <Toolbar className={classes.mobileToolbar}>
              <Toolbar component={Link} to="/"  className={classes.title}><Typography className={classes.mobileTitle} variant="h3">In Control Finance</Typography></Toolbar>
              <MenuIcon onClick={toggleDrawer("right", true)}/>
              <Drawer classes={{paper: classes.paper}} anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
                <ArrowBackIcon className={classes.backArrow} onClick={toggleDrawer("right", false)}></ArrowBackIcon>
                <Typography component={Link} to="/" className={classes.navLink} onClick={toggleDrawer("right", false)} variant="h6">Home</Typography>
                <Typography component={Link} to="/accounts" className={classes.navLink} onClick={toggleDrawer("right", false)} variant="h6">Accounts</Typography>
                <Typography component={Link} to="/allocation" className={classes.navLink} onClick={toggleDrawer("right", false)} variant="h6">Allocation</Typography>
                <Typography component={Link} to="/trends" className={classes.navLink} onClick={toggleDrawer("right", false)} variant="h6">Trends</Typography>
                <Toolbar className={classes.mobileDiv}>{user ? (
                  <div className={classes.userDiv}>
                    <Avatar className={classes.mobileAvatar} alt={user?.result.name} src={user?.result.ImageUrl}>{user?.result.name.charAt(0)}</Avatar> 
                      <Typography className={classes.mobileUserName} variant="h6">{user?.result.name}</Typography>
                    <Button className={classes.mobileButton} variant="contained" onClick={logout}>Logout</Button>
                  </div>
                ) : (
                  <Button className={classes.button} color="secondary" component={Link} to="/auth" variant="contained">Login/Sign-Up</Button>
                )}
                </Toolbar>
              </Drawer>
            </Toolbar>
            )
            :
          (
          <Toolbar>
          <div className={classes.links}>
            <Typography component={Link} to="/" className={classes.navLink} variant="h6">Home</Typography>
            <Typography component={Link} to="/accounts" className={classes.navLink} variant="h6">Accounts</Typography>
            <Typography component={Link} to="/allocation" className={classes.navLink} variant="h6">Allocation</Typography>
            <Typography component={Link} to="/trends" className={classes.navLink} variant="h6">Trends</Typography>
          </div>
          <Toolbar component={Link} to="/" className={classes.title}><Typography className={classes.title} variant="h3">In Control Finance</Typography></Toolbar>
          <Toolbar>{user ? (
            <div className={classes.userLinks}>
              <Avatar className={classes.margin} alt={user?.result.name} src={user?.result.ImageUrl}>{user?.result.name.charAt(0)}</Avatar> 
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button className={classes.logoutButton} variant="contained" color="inherit" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button className={classes.button} color="secondary" component={Link} to="/auth" variant="contained">Login/Sign-Up</Button>
          )}
          </Toolbar>
          </Toolbar>

          )}
      </AppBar>
    </div>
  );
}

export default NavBar;