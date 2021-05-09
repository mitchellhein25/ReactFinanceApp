import { makeStyles} from '@material-ui/core/styles';
import useStyles from './styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(.2),
        },
      },
    formElement: {
        margin: "3px",
    },
    paper: {
        padding: theme.spacing(1),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}));