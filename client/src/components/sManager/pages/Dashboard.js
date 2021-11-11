import React from 'react';
import clsx from 'clsx';
import Axios from "axios";
import {toast} from 'react-toastify'
import { useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import DashboardPaymentUI from './DashboardPaymentUI';
import {Redirect} from "react-router-dom"

import {mainListItems,Logo} from './listItems';
//import Chart from './Chart';
//import Deposits from './Deposits';
import SalesOrderChart from '../../charts/SalesOrderChart';
import SalesCustomerChart from '../../charts/SalesCustomerChart';
import Title from './Title';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';




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
  },
  paper: {
    padding: theme.spacing(2),
    height: 'auto',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
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
    backgroundColor:'rgb(37,37,94)',
  }
};


export default function Dashboard() {
  const classes = useStyles();
  const { id } = useParams();
  const [Dt, setDt] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/view_sManager', {
          params: {
              id: id,  
          }
          
      });

      setDt(response.data[0]);
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
  const [orderNotifyCount,setorderNotifyCount]=useState([]);

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
 

  const responsee = await Axios.get('http://localhost:3001/sales_ordernotifyDeactive', {
  });


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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const[isAuth,setIsAuth]=useState(true);
  if(!isAuth){
    return <Redirect to="" />
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37,37,94)'}}>
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
          <IconButton color="inherit" fontSize="inherit">
            <Badge badgeContent={total} color="secondary">
            <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img}/>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List> 
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        {/* <Divider />
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}} onClick={()=>setIsAuth(false)}>{Profile}</List>
       <Divider/>
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider /> */}
      </Drawer>
      </div>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <div>
        <Paper>
        <Typography  component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <Title><h4><b>Dashboard</b></h4></Title>
                </Typography>
        </Paper>
        </div>
        <br/>
          <Grid container spacing={3}>


              {/* Chart */}
              <Grid item xs={12} >
              <Paper className={fixedHeightPaper} style={{height:'auto'}}>
                <Title>Order Chart</Title>
                <SalesOrderChart />
              </Paper>
            </Grid> 

            <Grid item xs={12} >
              <Paper className={fixedHeightPaper} style={{height:'auto'}}>
                <Title>New Customer Chart</Title>
                <SalesCustomerChart />
              </Paper>
            </Grid> 
          
          

            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DashboardPaymentUI />
              </Paper>
            </Grid> */}
      

           
          

          
            </Grid>
            
          <Box pt={4}>
            <Copyright />
          </Box>

        </Container>
      </main>
    </div>
  );
}
