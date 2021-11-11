import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useParams} from 'react-router-dom'
import { Form, Row, Col} from "react-bootstrap";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios';
import {Button} from '@material-ui/core'

import { mainListItems, Logo } from './listItems';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eut Furniture
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
   
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  userimage : {
    height: 60,
    width: 60,
    borderRadius:100,
    borderColor:'white',

  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor:'#f0f8ff'
  },
 
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignContent:'center',
    align:'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  
  }));

  const styles = {
    side:{
      backgroundColor:'rgb(37, 37, 94)',
    }
  };

  toast.configure()
export default function EditPrioritizeOrders() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {order_id} = useParams();
    const [Dt, setDt] = useState([])
    const [newPriority, setNewPriority] = useState();
  
    const [paymentNotifyCount,setpaymentNotifyCount]=useState([])
    useEffect(()=>{
      Axios.get("http://localhost:3001/cashPaymentnotifyCount").then((response)=>{
        setpaymentNotifyCount(response.data)
        
      })
    },[])
  
    const paymentcount=paymentNotifyCount.map(record=>record.count);
    console.log(paymentcount);
  
  
    const [returnNotifyCount,setreturnNotifyCount]=useState([])
    useEffect(()=>{
      Axios.get("http://localhost:3001/returnnotifyCount").then((response)=>{
        setreturnNotifyCount(response.data)
        
      })
    },[])
  
    const returncount=returnNotifyCount.map(record=>record.r_count);
    console.log(returncount);
  
    const [orderNotifyCount,setorderNotifyCount]=useState([])
    useEffect(()=>{
      Axios.get("http://localhost:3001/ordernotifyCount").then((response)=>{
        setorderNotifyCount(response.data)
        
      })
    },[])
  
    const ordercount=orderNotifyCount.map(record=>record.o_count);
    console.log(ordercount);
  
    const [returnNotifymess,setreturnNotifymess]=useState([])
    useEffect(()=>{
      Axios.get("http://localhost:3001/returnnotifymess").then((response)=>{
        setreturnNotifymess(response.data)
        
      })
    },[])
    const returnmesscount=returnNotifymess.map(record=>record.r_count);
  
    const [paymentNotifymess,setpaymentNotifymess]=useState([])
    useEffect(()=>{
      Axios.get("http://localhost:3001/paymentnotifymess").then((response)=>{
        setpaymentNotifymess(response.data)
        
      })
    },[])
    const paymentmesscount=paymentNotifymess.map(record=>record.count);
   
  
    const [orderNotifymess,setorderNotifymess]=useState([])
    useEffect(()=>{
      Axios.get("http://localhost:3001/ordernotifymess").then((response)=>{
        setorderNotifymess(response.data)
        
      })
    },[])
    const ordermesscount=orderNotifymess.map(record=>record.o_count);
  
  
    const total = Number(paymentcount) + Number(returncount) + Number(ordercount)
  
    const NotificationClick = async () => {
       const response = await Axios.get('http://localhost:3001/cashpaymentnotifyDeactive', {
       });
      
       const responses = await Axios.get('http://localhost:3001/returnnotifyDeactive', {
      });
  
      const responsee = await Axios.get('http://localhost:3001/ordernotifyDeactive', {
      });
  
      if(paymentmesscount>0)
      {
        const customToast=()=>{
          return(
            <div style={{fontSize:'15px'}}>
              You have {paymentmesscount} New Payment Confirmations from Deliver Person! <br></br><br></br>
              <Button variant="contained" color="primary"  onClick={Notification_page_payment}>View</Button>
            </div>
          )
        }
  
        const notify=()=>{
         
          toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
            }
            notify();
            
  
      }
  
      
  
        if(returnmesscount>0)
        {
          const customToasts=()=>{
            return(
              <div style={{fontSize:'15px'}}>
                You have {returnmesscount} New Return Delivery Confirmations from Deliver Person! <br></br><br></br>
                <Button variant="contained" color="primary"  onClick={Notification_page_return}>View</Button>
              </div>
            )
          }
  
          const notifye=()=>{
         
            toast.info(customToasts,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
          
          
              }
          notifye();
        }
  
        if(ordermesscount>0)
        {
          const customToastse=()=>{
            return(
              <div style={{fontSize:'15px'}}>
                You have New {ordermesscount} Delivery Confirmations from Deliver Person! <br></br><br></br>
                <Button variant="contained" color="primary" onClick={Notification_page_order}>View</Button>
              </div>
            )
          }
  
          const notifyee=()=>{
         
            toast.info(customToastse,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
          
          
              }
          notifyee();
        }
  
  
      
        
        const Notification_page_payment=()=>{
        window.location.href='/dManager/pages/Notification_payment'
        }
        
        const Notification_page_return=()=>{
          window.location.href='/dManager/pages/Notification_return'
          }
  
          const Notification_page_order=()=>{
            window.location.href='/dManager/pages/Notification_order'
            }
    }
  

    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/viewPriorityDetails', {
              params: {
                 order_id: order_id,
              }
          });
          setDt(response.data[0]);
          setNewPriority(response.data[0].o_priority)
             console.log(response.data[0]);
      };
      fetchData();
    }, [order_id]);
  
    const [PriorityList,setPriorityList]=useState([])
    useEffect(()=>{
    axios.get("http://localhost:3001/getPriority").then((response)=>{
    setPriorityList(response.data)
    })
    },[])
    
    const updatePriority = (order_id) => {
      axios.put("http://localhost:3001/AssignPriority", 
      {
        Priority_number: newPriority,
        order_id: order_id
      }
        ).then(
        (response) => {
          setPriorityList(Dt.map((val) => {
            return val.order_id === order_id ? {order_id: val.order_id, Priority_number: val.o_priority, Priority_number: newPriority} : val  
          }))
       }
      )
      alert("Updated successfully")  
    };
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37, 37, 94)'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <strong>DELIVERY MANAGER</strong>
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>

          <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon onClick={handleClick}  />
          </IconButton>

          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}><Link to='/dManager/pages/ManageProfile' style={{textDecoration:'none',color:'black'}}>Profile</Link></MenuItem>
            <MenuItem onClick={()=>setIsAuth(false)}>Logout</MenuItem>
          </Menu>
          
        </Toolbar> 
      </AppBar>
      <div style={styles.side}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List>
        <Divider />
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        
      </Drawer>
      </div>
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>EDIT PRIORITY</strong>
              </Typography><br/>

             
            <Form>           
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                  Order Id : 
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                  {Dt.order_id} 
                  </Form.Label>
                  
                  </Col>
              </Form.Group><br/>

              <Form.Group as={Row} controlId="formHorizontalPrice">
                  <Form.Label column lg={2} >
                  Priority :
                  </Form.Label>
                  <Col >
                  <Form.Control type="text" defaultValue={newPriority}  onChange={(event)=> {
                      setNewPriority(event.target.value);
                  }} required
                  />
                  </Col>
              </Form.Group><br/>
    
              <div align="center">
              <Button  type="submit" variant="contained" color="primary"  style={{fontSize:'20px',width:'200px'}} onClick={() => {updatePriority(Dt.order_id)}} >Edit</Button>
              </div><br/><br/>
            </Form>

              </Paper>
              </div>
        </Grid>
        </Grid>  

        <Box pt={4}>
            <Copyright />
        </Box>

        </Container>
      </main>
    </div>
  );
}
