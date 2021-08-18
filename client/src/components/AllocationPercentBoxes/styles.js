import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paddingNone: {
        padding: 0
    },
    red: {
        color: 'red',
    },
    paddingTop: {
        paddingTop: '10px'
    },
    marginTop: {
        marginTop: "20px"
    },
    buttonMarginTop: {
        marginTop: "3px",
        marginLeft: "5px",
        marginRight: "5px"
    },
    allo: {
        textAlign: "center"
    },
    accountBox: {
        marginTop: "10px",
        minHeight: "50px",
        maxHeight: "50px",
        display: "flex",
        
    },
    accountTitle: {
        alignSelf: "flex-end",
        overflow: "hidden",
        // whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        textAlign: "center",
        margin: "auto"
    }
}));