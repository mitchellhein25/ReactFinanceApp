import { makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    head: {
        backgroundColor: 'lightgray',
      },
    tableColumn: {
        padding: '0px',
        paddingLeft: '15px',
    },
    tableHeader: {
        textAlign: "center",
        padding: "5px"
    },
    green: {
        backgroundColor: 'lightgreen',
        fontWeight: '600'
    },
    red: {
        backgroundColor: 'lightcoral',
    },
    gold: {
        backgroundColor: 'gold',
    },
    budgetTotal: {
        backgroundColor: 'lightgreen',
        fontSize: '20px',
        fontWeight: '600'
    },
}));