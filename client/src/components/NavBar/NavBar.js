import React from "react";
import { AppBar, Toolbar, Button, Typography, Icon, Box } from '@material-ui/core';
// import HomeIcon from '@material-ui/icons/HomeIcon';
import { Link } from "react-router-dom";
import useStyles from './styles';

const NavBar = ({}) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Link className={classes.navLink} to="/">
            <Icon fontSize="large">home</Icon>
          </Link>
          <Typography className={classes.links} variant="h6">
            <Link className={classes.navLink} to="/">
            Home
            </Link>
            <Link className={classes.navLink} to="/accounts">
              Accounts
            </Link>
          </Typography>
          {/* <Typography className={classes.title} variant="h3">
            Finance App
          </Typography> */}
          <Button style={{ fontSize: '20px' }} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;