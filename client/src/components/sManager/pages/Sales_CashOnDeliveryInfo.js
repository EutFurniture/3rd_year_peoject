import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";
//import { useParams } from 'react-router-dom';

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
import { Form,Row,Col } from "react-bootstrap";
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios';
import {Button} from '@material-ui/core';

import { mainListItems, Logo} from './listItems';
import Title from './Title';


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
    width: '940px',
  },
  fixedHeight: {
    height: 'auto',
  },
  imageInput:{
    border:'none',
    borderColor:'white'
  },
  profile_img:{
    width:'50px',
    height:'50px',
    borderRadius:'50px'
  }
}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  },

  card:{
    display:"flex",
    flexDirection :"row",
    justifyContent:"space-between",
  },

  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  
};

toast.configure()

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function Sales_CashOnDeliveryInfo() {
  const { order_id } = useParams();
  const [Dt, setDt] = useState([])

  

  const [orderNotifyCount,setorderNotifyCount]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/sales_ordernotifyCount").then((response)=>{
      setorderNotifyCount(response.data)
      
    })
  },[])

  const ordercount=orderNotifyCount.map(record=>record.o_count);
  console.log(ordercount);

  
 

  const [orderNotifymess,setorderNotifymess]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:3001/sales_ordernotifymess").then((response)=>{
      setorderNotifymess(response.data)
      
    })
  },[])
  const ordermesscount=orderNotifymess.map(record=>record.o_count);


  const total = Number(ordercount)

  const NotificationClick = async () => {
   

    // const responsee = await Axios.get('http://localhost:3001/sales_ordernotifyDeactive', {
    // });


      if(ordermesscount>0)
      {
        const customToastse=()=>{
          return(
            <div style={{fontSize:'15px'}}>
              You have New {ordermesscount} Orders! <br></br><br></br>
              <Button variant="contained"  onClick={Notification_page_order}>View</Button>
            </div>
          )
        }

        const notifyee=()=>{
       
          toast.info(customToastse,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
        
        
            }
        notifyee();
      }

        const Notification_page_order=()=>{
          window.location.href='/sManager/pages/Sales_Notification_order'
          }
  }
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/sales_PaymentDetails', {
          params: {
              order_id: order_id,
              
          }
          
      });

      setDt(response.data[0]);
         console.log(response.data[0]);

  };
  fetchData();
}, [order_id]);

  const classes = useStyles();

  const { id } = useParams();
  const [Dat, setDat] = useState([])

  
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/view_sManager', {
          params: {
              id: id,  
          }
          
      });

      setDat(response.data[0]);
        // console.log(response.data[0]);

  };
  fetchData();
}, [id]);

  const [open, setOpen] = React.useState(true);

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
            <strong>SALES MANAGER</strong>
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>

          {/* <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon onClick={handleClick}  />
          </IconButton> */}
          <img src={`/${Dat.emp_img}`} onClick={handleClick} className={classes.profile_img} alt="Profile Img"/>

          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}><Link to='/sManager/pages/Sales_ViewProfile' style={{textDecoration:'none',color:'black'}}>Profile</Link></MenuItem>
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        {/* <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Profile}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}}>{Logout}</List>
        <Divider /> */}
      </Drawer>
      </div>
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
                  
           
          <Grid item xs={10} style={styles.pack} >
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h5" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                    <Title>PAYMENT INFORMATION</Title>
              </Typography>
            
              <div>
                
                <hr />
              <Typography component="h1" color="inherit" align="left" width="100%" noWrap className={classes.title}>
                  <strong>  Order Details </strong>
              <hr />
              </Typography>
              
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  
                  <strong> Order Id</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                   {Dt.order_id}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
          
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong>  Customer Id</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  {Dt.customer_id}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
           
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong> Payment Status</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  {Dt.payment_status}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

            

              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong>  Delivery Status</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  {Dt.status}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <hr />
              <Typography component="h1" color="inherit" align="left" width="100%" noWrap className={classes.title}>
                  <strong>  Order Schedule </strong>
              <hr/>
                 
              </Typography>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong> Order Date</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  {dateOnly(Dt.o_date)}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong>Deliver Date</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  {dateOnly(Dt.order_last_date)}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

              <hr/>
              <Typography component="h1" color="inherit" align="left" width="100%" noWrap className={classes.title}>
                  <strong>  Payment Details </strong>
              <hr/>
                 
              </Typography>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong> Payment Method</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  {Dt.payment_method}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong> Total Price</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                  Rs. {Dt.total_price} .00
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong> Advance Price</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                   Rs. {Dt.advance_price} .00
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={3} >
                  <strong> Payable Amount</strong>
                  </Form.Label>
                  <Form.Label column lg={1} >
                  <strong>:</strong>
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={3} >
                    Rs. {Dt.total_price-Dt.advance_price} .00
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              
              </div>
              </Paper>
              </div>
            </Grid>
 
          </Grid>
          
          
        </Container>
      </main>
    </div>
  );
}
