import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    links: {
      display: 'flex',
      flexGrow: 1,
    },
    userLinks: {
      display: 'flex',
      // flexGrow: 1,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        paddingLeft: '30px',
        display: 'flex'
    },
    margin: {
      display: 'flex',
      marginLeft: '15px',
      marginRight: '15px',
    },
    title: {
      flexGrow: 1,
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '15px',
      marginRight: '15px',
      paddingRight: '15px',
    },
}));