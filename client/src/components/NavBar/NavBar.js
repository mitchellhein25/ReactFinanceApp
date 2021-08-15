import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Icon, Avatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';

const NavBar = ({}) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      
      //Gets token expiration in ms and current time in ms
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          {/* <Link className={classes.navLink} to="/">
            <Icon fontSize="large">home</Icon>
          </Link> */}
          <div className={classes.links}>
            <Typography component={Link} to="/" className={classes.navLink} variant="h6">Home</Typography>
            <Typography component={Link} to="/accounts" className={classes.navLink} variant="h6">Accounts</Typography>
            <Typography component={Link} to="/allocation" className={classes.navLink} variant="h6">Allocation</Typography>
          </div>
          <Toolbar className={classes.title}><Typography variant="h3">In Control Finance</Typography></Toolbar>
          <Toolbar>{user ? (
            <div className={classes.userLinks}>
              <Avatar className={classes.margin} alt={user?.result.name} src={user?.result.ImageUrl}>{user?.result.name.charAt(0)}</Avatar> 
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button className={classes.margin} variant="contained" color="inherit" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button style={{ fontSize: '20px' }} color="secondary" component={Link} to="/auth" variant="contained">Login/Sign-Up</Button>
          )}
          </Toolbar>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;