import { makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({

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
        marginTop: "5px"
    },
    divider: {
        height: "3px"
    }
}));