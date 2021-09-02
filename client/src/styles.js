import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        paddingTop: '20px',
    },
    totals: {
        textAlign: "center"
    },
    red: {
        backgroundColor: "lightcoral",
        padding: '2px',
        paddingLeft: "5px",
        paddingRight: "5px"
    },
    green: {
        backgroundColor: "lightgreen",
        padding: '2px',
        paddingLeft: "5px",
        paddingRight: "5px"
    },
    totalsBox: {
        paddingBottom: "20px",
        marginTop: "10px"
    },
    divider: {
        paddingTop: "20px",
        height: "5px"
    },
    root: {
        flexGrow: 1,
        padding: 0
        // backgroundColor: theme.palette.background.paper,
      },
    budgetGrid: {
        paddingTop: '30px',
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
    },
    fullPanel: {
        flexGrow: 1,
    },
    infoModalButton: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center'
    }
}));