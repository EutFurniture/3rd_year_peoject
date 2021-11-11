import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Feedback from '@material-ui/icons/Feedback';
import Redeem from '@material-ui/icons/Redeem';
import ListAlt from '@material-ui/icons/ListAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { cssTransition, toast,ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@material-ui/core/Modal';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

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
      toolbar: {
            backgroundColor: 'white',
            color: 'black',

            padding: "1%",

      },
      toolbarTitle: {
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: '30px',
            textShadow: "5px 3px 10px rgb(169,169,169)",
      },
      link: {

            margin: theme.spacing(1, 1.5),
            fontWeight: 'bold',
            flexShrink: 0,
            textAlign: 'center',
            fontSize: '20px',
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
      heroContent: {
            padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
            backgroundColor:
                  theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
      ass: {
            textDecoration: "none",
            color: "white",
            '&:hover': {
                  textDecoration: "none",
                  color: "white",
            }
      },
      navalign: {
            align: 'center',
            textAlign: 'center',
            marginRight: '330px'
      },
      but:{
            background:'darkblue',
            marginLeft: '10px', 
           fontWeight:"bold",
            color:'white', 
            padding: '5px 10px', 
            borderRadius: '5px'
      },

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


const dateOnly = (d) => {
      const date = new Date(d);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year} - ${month} - ${day}`;
    };


export default function Navbar(userData) {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
            setAnchorEl(null);
      };
      const handleOpen = () => {
            setOpen(true);
      };


      const handleCloses = () => {
            setOpen(false);
      };
      toast.configure()
      const logout = () => {

            axios.get("http://localhost:3001/clearcart",{
                  params:{
                        cid:userData.userData.customer_id,
                  }
            });
            axios.post("http://localhost:3001/logout").then((response) => {
                  window.location.href = '/'
            })
      }

      const [cusorderCount, setCusOrderCount] = useState([])
      const [orderList, setorderList] = useState([])
      const [deliveryorder, setDeliveryorder] = useState([])
      const [categoryList, setCategoryList] = useState([])
      const [cartCount, setCartCount] = useState([]);
      const [ACount, setACount] = useState([]);
      const [RCount, setRCount] = useState([]);
      const [DCount, setDCount] = useState([]);
      const [customer, setCustomer] = useState([])

      const Cuspage = (oid,cid,cuid) => {
            window.location.href = `/customer/notification/${oid}/${cid}/${cuid}`
      }

      useEffect(() => {
            axios.get("http://localhost:3001/customer", {
                  params: {
                        email: userData.userData.email,
                  }
            }).then((response) => {
                  setCustomer(response.data[0])


            });

      }, [])


      useEffect(() => {
            // axios.post("http://localhost:3001/customerNofication",{
            //       params:{
            //             customer_id:userData.userData.userData,
            //       }
            // }).then((response)=>{
            //       setCusOrderCount(response.data);
            // })


            const response1 = axios.get("http://localhost:3001/cartCount", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setCartCount(response.data)


            });

            axios.get("http://localhost:3001/customerNofication", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setorderList(response.data)

            })

      }, [])

      useEffect(() => {
            axios.get("http://localhost:3001/customerNoficationRej", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setCusOrderCount(response.data)

            })
      }, [])

      useEffect(() => {
            axios.get("http://localhost:3001/deliverydate", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setDeliveryorder(response.data)

            })

      }, [])


      useEffect(() => {
            axios.get("http://localhost:3001/customerNoficationRcount", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setRCount(response.data)


            });

      }, [])
      useEffect(() => {
            axios.get("http://localhost:3001/customerNoficationAcount", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setACount(response.data)


            });

      }, [])
      useEffect(() => {
            axios.get("http://localhost:3001/customerNoficationDcount", {
                  params: {
                        customer_id: userData.userData.customer_id,
                  }
            }).then((response) => {
                  setDCount(response.data)


            });

      }, [])
      
      const cardcount = cartCount.map(record => record.count);
      const Rcount = RCount.map(record => record.rcount);
      const Account = ACount.map(record => record.acount);
      const Dcount = DCount.map(record => record.dcount);
      const total=Number(Account[0])+Number(Rcount[0])+Number(Dcount[0])
console.log(total);
<ToastContainer theme="light" />
      const NotificationClick = () => {
            axios.get("http://localhost:3001/deliverydateDeactive", {
                  params:{
                        customer_id: userData.userData.customer_id,
                  }
            });

           
           
             axios.get('http://localhost:3001/customerNoficationADeactive', {
                  params:{
                        customer_id: userData.userData.customer_id,
                  }

           });
       
           axios.get('http://localhost:3001/customerNoficationRDeactive', {
            params:{
                  customer_id: userData.userData.customer_id,
            }
           });
       



        
                  const AcustomToast = (id,cid,pid) => {
                        return (
                              <div>
                                    Hello,
                                    Your customized Order has been confirmed.
                                    Pay the advance payment for this product.
                                    <button  className={classes.but} 
                                                      onClick={()=>Cuspage(id,cid,pid)}>
                                                      PAY
                                                </button>
                              </div>
                        )
                  }
                  const Anotify = (id,cid,pid) => {

                        toast.info(AcustomToast(id,cid,pid), { position: toast.POSITION.TOP_RIGHT, autoClose: false,theme: "light" })


                  }
                  {orderList.map((val, key) => {
                  Anotify(val.order_id,val.customer_id,val.cus_product_id)
            })}

            
         

                  const RcustomToast = (name) => {
                        return (
                              <div>
                                    Hello,
                                    your {name} order  has been  Rejected.
                              </div>
                        )
                  }

                  const Rnotify = (name) => {

                        toast.info(RcustomToast(name), { position: toast.POSITION.TOP_RIGHT, autoClose: false, theme: "light"})


                  }
                  {cusorderCount.map((val, key) => {
                  Rnotify(val.product_name)
            })}
            
      

                  const DcustomToast = (id,date) => {
                        return (
                              <div>
                                    {/* Hello,
                                                your order (OrderId :-{id})  will be deliver on {date}. */}
                                    Hello,
                                    your order(orderId-:{id}) will be deliver on {dateOnly(date)}.

                              </div>
                        )
                  }
                  const Dnotify = (id,date) => {

                        toast.info(DcustomToast(id,date), { position: toast.POSITION.TOP_RIGHT, autoClose: false})


                  }
                  {deliveryorder.map((val, key) => {
                  Dnotify(val.order_id,val.order_last_date)
            })}
            

        


      }





      const customizedcount = cusorderCount.map(record => record.count);
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
                                    You got {customer.points}  points
                                    so we  give small gift for you.
                              </Typography>
                              <Typography gutterBottom>
                                    So you can choose and order the  gift that you Prefer.
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
                  <CssBaseline />
                  <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                              <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
                                    EUT FURNITURE
                              </Typography>
                              <nav style={{ display: 'flex' }}>
                                    <div className={classes.navalign}>
                                          <Link variant="body2" noWrap color="inherit" href="/customer/dashboard" className={classes.link}>
                                                Home
                                          </Link>
                                          <Link variant="body2" noWrap color="inherit" href="/customer/about" className={classes.link}>
                                                About
                                          </Link>
                                          <Link variant="body2" noWrap color="inherit" href="/customer/dining" className={classes.link}>
                                                Product
                                          </Link>
                                          <Link variant="body2" noWrap color="inherit" href="/customer/customization" className={classes.link}>
                                                Customization
                                          </Link>
                                    </div>
                                    <div>
                                          <Link
                                                color="inherit"
                                                noWrap
                                                variant="body2"
                                                href='/customer/cart'
                                                className={classes.toolbarLink}
                                          >
                                                <Badge color="secondary" badgeContent={cardcount} >
                                                      <AddShoppingCart />
                                                </Badge>
                                          </Link>
                                          {/* <Link
                                          color="inherit"
                                          noWrap
                                          variant="body2"
                                          href='/customer/Allnotify'
                                          className={classes.toolbarLink}
                                    >
                                            <Badge color="secondary" badgeContent={customizedcount}>
                                                <NotificationsIcon style={{marginLeft:'30px'}}/>
                                          </Badge>
                                    </Link> */}

                                          <IconButton onClick={NotificationClick} color="inherit">
                                                <Badge color="secondary" badgeContent={total}>
                                                      <NotificationsIcon style={{ marginLeft: '30px' }} />
                                                </Badge>
                                          </IconButton>

                                          <Link
                                                color="inherit"
                                                noWrap
                                                aria-controls="customized-menu"
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                                variant="body2"
                                                href='#'
                                                className={classes.link}
                                          >
                                                <img src={`/${customer.proimg}`} onClick={handleClick} class="rounded-circle" width="35" height="35" alt='/Noimage'/>
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


                              </nav>
                              {/* <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button> */}
                        </Toolbar>
                  </AppBar >



            </React.Fragment >
      );
}