import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    yellow: {
        backgroundColor: "gold",
        padding: '2px',
        paddingLeft: "5px",
        paddingRight: "5px",
        fontWeight: "500"
    },
    tooltip: {
        backgroundColor: "white", 
        fontSize: "20px", 
        color: 'rgba(0, 0, 0, 0.87)',
        border: 'None',
        textAlign: "center"
    }
}));