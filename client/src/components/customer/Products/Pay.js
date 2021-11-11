import React,{Fragment,useState} from 'react'
import { Link ,useParams} from 'react-router-dom';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
//import './product.css'
const useStyles = makeStyles((theme) => ({
  check:{
    backgroundColor:'grey',
    fontWeight:'bold',
  },
  ass:{
    textDecoration:'none',
    color:"white",
    '&:hover':{
      textDecoration:'none',
      color:'white',
    }
  }
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  gift:{
    padding:"20px",
    position:"relative",
    right:"20%",
    marginTop:'80%',
    backgroundCloor:"black",
    color:'white',
  },
  
 
});



const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Pay(userData) {
  const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user,setUser]=useState([])
    const { customer_id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; 
 
    return (
        <Fragment>
         
          <div className="shap"> 
   
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <h3 className="gitt"> Surprise gift !</h3>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           <img src="../../images/giftt.jpg" className="giftt" />
          </Typography>
          <Typography gutterBottom>
            You got 15 points
            so we  give small gift for you.
          </Typography>
          <Typography gutterBottom>
           So you can order gift below 15 points.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} class='btn btn-primary'>
              <Link to='/customer/gift' className={classes.ass}>
            Select gift
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  
     
        </Fragment>
    )
}











 







  

    
 
