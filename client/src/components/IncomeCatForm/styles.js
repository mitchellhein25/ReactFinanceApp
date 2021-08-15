import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(.2),
        },
      },
      formElement: {
        margin: "3px",
        minWidth: "200px"
    },
    paper: {
        padding: theme.spacing(1),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    inputMargin: {
        marginTop: "10px"
    },
    buttonRow: {
        marginTop: "7px"
    }
}));