import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import Axios from 'axios';
import {toast} from 'react-toastify'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import CategoryChart from '../../charts/CategoryChart';
import DoughnutChart from '../../charts/DoughnutChart';
import SalesCustomerChart from '../../charts/SalesCustomerChart';
//import ReturnItemChart from '../../charts/ReturnItemChart';
//import CustomizeChart from '../../charts/CustomizeChart';
import SalesOrderChart from '../../charts/SalesOrderChart';
//import SalesTypeChart from '../../charts/SalesTypeChart';
//import OrderChart from '../../charts/ApexChart';
import Chart from "react-apexcharts";

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PeopleIcon from '@material-ui/icons/People';
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ApexChart from '../../charts/ApexChart';
import Title from './Title';

import {Redirect} from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
//import {userData} from "../../charts/dummydata"
import { mainListItems, Profile, Logout } from './listItems';
//import '../css/Dashboard.css'
//import CustomizeOrder from './CustomizeOrder'
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
    // fontSize:40,
    // fontWeight:600,
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
   
  },
  custom:{
    display:'flex',
    paddingLeft:'20px',
    
   height:'80px',
   paddingBottom:'10px',
    color:'black',
    fontSize:'20px',
   
  
},
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
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
  },
  maindash:{
    display:'flex'
  },
  piechart:{
      display:'flex'
  },
  pieleft:{
 width:'300px',
 marginLeft:'50px'
  },
  pieright:{
    width:'300px',
    marginLeft:'300px'
     },
 datesalign:{
  display:'flex'
},
dateleft:{
    marginRight:'100px',
    marginBottom:'20px',
    marginLeft:'30px'
}

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};



const GenerateReport=()=> {

  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

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
  const {todate}=useParams();
  const {fromdate}=useParams();

  // const [returnList,setReturnList]=useState([])
  // useEffect(()=>{
  //   axios.get("http://localhost:3001/sales_ReturnCount").then((response)=>{
  //     setReturnList(response.data)
  //     console.log(response)
  //   })
  // },[])
  
  const [quantityList,setQuantityList]=useState([])
  // useEffect(()=>{
  //   axios.get("http://localhost:3001/sales_CategoryNoChart").then((response)=>{
  //     setQuantityList(response.data)
  //     console.log(response)
  //   })
  // },[])

  
  

  
  const [customercount,setCustomerCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_CustomerCount").then((response)=>{
      setCustomerCount(response.data)
      console.log(response)
    })
  },[])

  
  const [order,setOrder]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_Order").then((response)=>{
      setOrder(response.data)
    })
  },[])

  const [orderanalyze,setOrderAnalyze]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_OrderAnalyze").then((response)=>{
      setOrderAnalyze(response.data)
    })
  },[])

  
  const orderdata={orderanalyze};
  console.log(orderdata);

const arr=quantityList.map(record=>record.quantity);
const cat=quantityList.map(record=>record.fname);





const month=customercount.map(record=>record.month);
const count=customercount.map(record=>record.count);

  // console.log(quantityList);
  // const arr = Object.values(quantityList);
  // console.log(arr)

  const [orderdate,setOrderDate]=useState([])
  const[currentmonth,setMonth]=useState("");
  const OrderDate = async () => {
      const response = await axios.get('http://localhost:3001/sales_OrderDetails', {
          params: {
           
            month:currentmonth,  
          }
          
      });
 
      setOrderDate(response.data);
         console.log(response.data[0]);
 
  }
  
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


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            <b>SALES MANAGER</b>
          </Typography>
          <IconButton color="inherit">
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
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
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}} onClick={()=>setIsAuth(false)}>{Profile}</List>
       <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>

      {/* <main className={classes.content}>
      <Adminmain />
        

 </main> */}
 <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          
          <Grid container spacing={1}>
          
          
              <Grid item xs={12} >
              <div>
            <Paper>
                 <Title><h4 align="center"><b>Sales Analytics</b></h4></Title>
                 </Paper>
          </div>
                 <br />
               </Grid> 
            


               {/* <div style={{display:'flex'}}>
              
            
              </div> */}

           
            
         </Grid>

        
         <Title>Order Chart</Title>
          
          <Grid item xs={12} style={{marginTop:'10px'},{marginLeft:'0px'}}>
              <Paper  style={{height:'330px'}}>
              <SalesOrderChart />
              </Paper>
              </Grid>

              <br />

              <br/>
              <Title>Customer Chart</Title>

          <div style={{display:'flex',marginTop:'10px'}}>
           
            
       
          <Grid item xs={12} style={{marginLeft:'0px'}}>
              <Paper style={{height:'500px'}} >
              <h2 style={{marginLeft:'20px',paddingTop:'10px'}}><b></b></h2>
                <SalesCustomerChart />
              </Paper>
            </Grid>
          
           
          </div>

         
          

          
            
          
        </Container>
      </main>
    </div>
  );
}

export default GenerateReport;