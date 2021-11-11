import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Feedback from '@material-ui/icons/Feedback';
import Redeem from '@material-ui/icons/Redeem';
import ListAlt from '@material-ui/icons/ListAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Modal from '@material-ui/core/Modal';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  toolbarSecondary: {
    backgroundColor: 'rgb(226, 226, 230)',
    color: 'black',

    padding: "1%",

    boxShadow: theme.shadows[5],
  },
  toolbarTitle: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  toolbarLink: {

    margin: theme.spacing(1, 1.5),
    fontWeight: 'bold',
    flexShrink: 0,
    padding: theme.spacing(1),
    textDecoration: 'none',
    '&:focus': {
      backgroundColor: 'black',
      color: 'white',
      textDecoration: 'none',
    },
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      textDecoration: 'none',
    }
  },
  head: {
    fontWeight: 'bold',
    color: 'grey',

  },
  check: {
    backgroundColor: 'grey',
    fontWeight: 'bold',
  },
  ass: {
    textDecoration: 'none',
    color: "white",
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
    }
  }

}));

const StyledMenu = withStyles({

  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const styles = (theme) => ({
  // root: {
  //   margin: 0,
  //   padding: theme.spacing(2),
  // },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  gift: {
    padding: "20px",
    position: "relative",
    right: "20%",
    marginTop: '80%',
    backgroundCloor: "black",
    color: 'white',
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


export default function Header(props) {
  const classes = useStyles();
  const { title, sections, cust } = props;
  const { customer_id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);
  const [cusorderCount, setCusOrderCount] = useState([])
  const [cartCount, setCartCount] = useState([])
  const [customer, setCustomer] = useState([])



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    axios.post("http://localhost:3001/logout").then((response) => {
      window.location.href = '/'
    })
  }



  toast.configure()




  //  const response1= axios.get("http://localhost:3001/CRcustorder",{
  //   params:{
  //     customer_id:a,
  //   }
  //  }).then((response)=>{
  //     setCusOrderCount(response.data)

  //   })
  //   const response2= axios.get("http://localhost:3001/cartCount",{
  //     params:{
  //       customer_id:a,
  //     }
  //   }).then((response)=>{
  //     setCartCount(response.data)


  //   })
  //   const response3= axios.get("http://localhost:3001/customer",{
  //     params:{
  //       email:b,
  //     }
  //   }).then((response)=>{
  //     setCustomer(response.data)

  //   })

  //  const point=customer.map(record=>record.points)



  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const handleCloses = () => {
    setOpen(false);
  };

  const NotificationClick = async () => {
    const response = await axios.get('http://localhost:3001/customerNoficationActive', {


    });
    notify();
  }
  const notify = () => {

    toast.info(customToast, { position: toast.POSITION.TOP_RIGHT, autoClose: false })


  }

  const customToast = () => {
    return (
      <div>
        Hello,
        Your customized Order has confirmed.
        Pay the advance payment for this product.
        <button style={{ marginLeft: '10px', border: 'none', backgroundColor: 'white', padding: '5px 10px', borderRadius: '5px' }} onClick={Cuspage}>PAY</button>
      </div>
    )
  }
  const Cuspage = () => {
    window.location.href = '/customer/notification'
  }
  // const customizedcount=cusorderCount.map(record=>record.count);
  //    const cardcount=cartCount.map(record=>record.count);

  const emptybody = (
    <div className="shap">


      <Dialog onClose={handleCloses} aria-labelledby="customized-dialog-title" open={open}>

        <DialogContent dividers>

          <Typography gutterBottom>
            Sorry,This service is not available for you.
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloses} class='btn btn-primary'>

            Close

          </Button>
        </DialogActions>
      </Dialog>
    </div>




  );
  const body = (

    <div className="shap">


      <Dialog onClose={handleCloses} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloses}>
          <h3 className="gitt"> Surprise gift !</h3>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <img src="../../images/giftt.jpg" className="giftt" />
          </Typography>
          <Typography gutterBottom>
            You got  points
            so we  give small gift for you.
          </Typography>
          <Typography gutterBottom>
            So you can order gift below Rs. .
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloses} class='btn btn-primary'>
            <Link href='/customer/gift' className={classes.ass}>
              Select gift
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>




  );




  return (
    <React.Fragment>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>

        <Toolbar className={classes.toolbarSecondary}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
          <nav>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href='/customer/dashboard'

              className={classes.toolbarLink}
            >
              Home
            </Link>

            <Link
              color="inherit"
              noWrap
              variant="body2"
              href='/customer/about'
              className={classes.toolbarLink}
            >
              About Us
            </Link>

            <Link
              color="inherit"
              noWrap
              variant="body2"
              href='/customer/dining'
              className={classes.toolbarLink}
            >
              Product
            </Link>

            <Link
              color="inherit"
              noWrap
              variant="body2"
              href='/customer/customization'
              className={classes.toolbarLink}
            >
              Customization
            </Link>

            <div>
              <Link
                color="inherit"
                noWrap
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="body2"
                href='#'
                className={classes.toolbarLink}
              >
                <AccountCircle fontSize="small" />
              </Link>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem onClick={handleClose}>
                  <ListItemIcon >
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <Link color="inherit" className={classes.toolbarLink} variant="body2" href="/customer/profile"><ListItemText primary="Profile" /></Link>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>
                  <ListItemIcon >
                    <ListAlt fontSize="small" />
                  </ListItemIcon>
                  <Link color="inherit" className={classes.toolbarLink} variant="body2" href="/customer/history"><ListItemText primary="Order History" /></Link>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>
                  <ListItemIcon >
                    <Feedback fontSize="small" />
                  </ListItemIcon>
                  <Link color="inherit" className={classes.toolbarLink} variant="body2" href="/customer/feedback"><ListItemText primary="Feedback" /></Link>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Redeem fontSize="small" />
                  </ListItemIcon>

                  <Link color="inherit" className={classes.toolbarLink} variant="body2" onClick={handleOpen}> <ListItemText primary="Gift Data" /></Link>
                  <Modal
                    open={open}
                    onClose={handleCloses}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}

                  </Modal>

                </StyledMenuItem>

                <StyledMenuItem onClick={logout}>
                  <ListItemIcon>
                    <ExitToApp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </StyledMenuItem>
              </StyledMenu>

            </div>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href='/customer/cart'
              className={classes.toolbarLink}
            >
              <Badge color="secondary">
                <AddShoppingCart badgeContent />
              </Badge>
            </Link>

            <IconButton onClick={NotificationClick} color="inherit">
              <Badge badgeContent color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
  cust: PropTypes.number,
};
