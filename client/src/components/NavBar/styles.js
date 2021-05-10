import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    links: {
      flexGrow: 1,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        paddingLeft: '30px'
    },
    title: {
      flexGrow: 1,
    },
}));