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
    root: {
        width: '100%',
    },
    
    container: {
        maxHeight: 440,
        overflowX: "auto",
        marginRight: "auto",
        marginLeft: "auto",
        // marginTop: "50px",
        padding: "10px",
        margin: "10px",
        // maxWidth: '90%'
    }

}));