import { useTheme , makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    links: {
      display: 'flex',
      flexGrow: 2,
    },
    userLinks: {
      display: 'flex',
      // flexGrow: 1,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '0 30px',
        display: 'flex',
    },
    margin: {
      display: 'flex',
      marginLeft: '15px',
      marginRight: '15px',
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: 'white',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
        textAlign: 'left'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        textAlign: 'center'
      },
    },
    mobileTitle: {
      flexGrow: 1,
      fontSize: '1.7rem',
      textAlign: 'center'
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '15px',
      marginRight: '15px',
      paddingRight: '15px',
    },
    button: {
      fontSize: '20px',
      maxHeight: '24px',
      display: 'flex',
      padding: '20px',
      margin: 'auto'
    },
    mobileToolbar: {
      display: 'flex',
      justifyContent: "flex-end",
    },
    paper: {
      background: '#3f51b5'
    },
    mobileAvatar: {
      margin: 'auto',
      marginTop: '10px'
    }, 
    mobileUserName: {
      textAlign: 'center',
      marginTop: '10px',
      color: 'white'
    },
    mobileButton: {
      margin: 'auto',
      marginTop: '10px',
      color: 'white',
      backgroundColor: 'LightCoral'
    },
    logoutButton: {
      backgroundColor: 'LightCoral',
      fontSize: '20px',
      maxHeight: '24px',
      display: 'flex',
      padding: '20px',
      margin: 'auto'
    },
    userDiv: {
      margin: 'auto',
      textAlign: 'center',
    },
    mobileDiv: {
      margin: '0 auto',
    },
    backArrow: {
      color: 'white',
      fontSize: '30px',
    },
    logo: {
      marginRight: "10px"
    }

}));