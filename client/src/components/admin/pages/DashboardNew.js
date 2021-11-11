import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
import {Redirect} from "react-router-dom"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { mainListItems } from './listItems';

import '../css/Dashboard.css'
import Chart from "react-apexcharts";
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ApexChart from '../../charts/ApexChart'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'
const drawerWidth = 240;

export const Logo = (
  <div>
    <ListItem >
      <ListItemIcon style={{color:'white'}}>
        <WeekendIcon/>
      </ListItemIcon >
      <ListItemText primary="EUT FURNITURE"/>
    </ListItem>
  </div>
);

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
  title1: {
    flexGrow: 1,
    fontSize:40,
    fontWeight:600,
    align:'left'
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
  maindash:{
    display:'flex'
  },
  piechart:{
      display:'flex'
  },
  pieleft:{
 width:'400px',
 marginLeft:'100px'
  },
  pieright:{
    width:'400px',
    marginLeft:'300px'
     },
 datesalign:{
  display:'flex'
},
dateleft:{
    marginRight:'100px',
    marginBottom:'20px',
    marginLeft:'30px'
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
  }
};


toast.configure()
const DashboardNew=()=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  const [cusorderCount,setCusOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
  },[])
  
  // const [quantityList,setQuantityList]=useState([])
  // useEffect(()=>{
  //   axios.get("http://localhost:3001/CategoryNoChart").then((response)=>{
  //     setQuantityList(response.data)
  //     //setCategoryList(response.data[0])
  //   })
  // },[])

  const [empcount,setEmpCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/EmployeeCount").then((response)=>{
      setEmpCount(response.data)
    })
  },[])

  const [cuscount,setCusCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomerNumber").then((response)=>{
      setCusCount(response.data)
    })
  },[])

  const [ordercount,setOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/OrderCount").then((response)=>{
      setOrderCount(response.data)
    })
  },[])

  const [productcount,setProductCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/ProductCount").then((response)=>{
      setProductCount(response.data)
    })
  },[])

  const [catcount,setCatCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CategoryCount").then((response)=>{
      setCatCount(response.data)
    })
  },[])

  const [return_count,setReturnCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/ReturnItemCount").then((response)=>{
      setReturnCount(response.data)
    })
  },[])

  const [delivercount,setDeliverCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/DeliverCount").then((response)=>{
      setDeliverCount(response.data)
    })
  },[])

  const [total_income,setTotalIncome]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/TotalIncome").then((response)=>{
      setTotalIncome(response.data)
    })
  },[])

  

  const [emp,setEmp]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/loadEmployee").then((response)=>{
      setEmp(response.data)
    })
  },[])


  const [Rorder,setRorder]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/recentOrders1").then((response)=>{
      setRorder(response.data)
    })
  },[])

  const { id } = useParams();
  const [Dt, setDt] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewAdmin', {
          params: {
              id: id,  
          }
          
      });

      setDt(response.data[0]);
        //  console.log(response.data[0]);

  };
  fetchData();
}, [id]);

const [catList,setCatList]=useState([])
useEffect(()=>{
  axios.get("http://localhost:3001/CategoryNoChart").then((response)=>{
    setCatList(response.data)
    // console.log(response)
  })
},[])

const arr=catList.map(record=>record.quantity);
const cat=catList.map(record=>record.name);

const NotificationClick = async () => {
  axios.get('http://localhost:3001/NoficationActive', {
     
      
  });
  
  const customToast=()=>{
    return(
      <div>
        You have requested customized Order from Customer!
        <button style={{marginLeft:'10px',border:'none',backgroundColor:'skyblue',borderRadius:'5px'}} onClick={Cuspage}>View</button>
      </div>
    )
  }

  const notify=()=>{
   
    toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
  
  
      }
      notify();

}

const customizedcount=cusorderCount.map(record=>record.count);
const total=Number(customizedcount);
console.log(customizedcount);

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

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }

  

const Cuspage=()=>{
  window.location.href='/CustomizeOrder'
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title1}>
            <b>ADMIN</b>
          </Typography>
          
          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
           

         
          {/* <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton> */}

          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img} alt='/Noimage'/>
   <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to='/admin/pages/ViewProfile' style={{textDecoration:'none',color:'black'}}>Profile</Link></MenuItem>
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
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
       
        
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
            <Paper className={classes.custom}>
               <h1><b>SYSTEM OVERVIEW</b></h1>
             
               </Paper>  
              <Paper className={fixedHeightPaper}>
                 

                       <div className="cardcollection">
                           <div className="admincard1">
                               <AttachMoneyIcon style={{fontSize:'40px',marginTop:'10px'}} /> 
                               <h2>Income</h2>
                               {total_income.map((record)=>{
                                 return(
                                  <p style={{fontSize:'25px'}}>Rs.{record.income}</p>
                                 )
                               })}
                           </div>

                           <div className="admincard2">
                           <AssignmentReturnedIcon style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Returned Items</h2>
                               {return_count.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.returncount}</p>
                                 )
                               })}
                           </div>

                           <div className="admincard4">
                           <PersonOutlineOutlinedIcon style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Customers</h2>
                               {cuscount.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.count}</p>
                                 )
                               })}
                           </div>

                           <div className="admincard3">
                           <ShoppingCartIcon style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Orders</h2>
                               {ordercount.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.ordcount}</p>
                                 )
                               })}
                           </div>

                           <div className="admincard5">
                             <PeopleIcon style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Employees</h2>
                               {empcount.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.count}</p>
                                 )
                               })}
                             
                           </div>
                           <div className="admincard6">
                           <ShoppingBasket style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Products</h2>
                               {productcount.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.procount}</p>
                                 )
                               })}
                           </div>
                           <div className="admincard7">
                           <PersonOutlineOutlinedIcon style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Deliver Persons</h2>
                               {delivercount.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.deliver_count}</p>
                                 )
                               })}
                           </div>
                           <div className="admincard8">
                           <AssignmentIcon style={{fontSize:'40px',marginTop:'10px'}}/>
                               <h2>Categories</h2>
                               {catcount.map((record)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{record.catcount}</p>
                                 )
                               })}
                           </div>
                       </div>
                      <br/>
                      
            
          
            </Paper>  
            </Grid> 
            </Grid>

            <div style={{display:'flex'}}>
            <Grid style={{marginTop:'10px'}} item xs={6} >
            <Paper style={{height:'480px'}}>
              <div style={{marginLeft:'20px'}}>
               <h2><b>ORDER ANALYTICS</b></h2>
               </div><br/>
               <ApexChart style={{marginLeft:'40px'}}/>
               </Paper>
            </Grid>

            <Grid style={{marginTop:'10px',marginLeft:'20px'}} item xs={6} >
            <Paper style={{height:'480px'}}>
              <div style={{marginLeft:'20px'}}>
               <h2><b>CATEGORYWISE ORDERS</b></h2>
               <Chart 
            options={{
                chart: {
                    width: 350,
                    type: 'pie',
                  },
                  labels: cat,
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 150
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }] }
        }
            series={arr} 
            type="pie"
            width={455}
             />
               </div><br/>
               
               </Paper>
            </Grid>
            </div>
          
          <div style={{display:'flex'}}>
            <Grid style={{marginTop:'10px'}} item xs={6} >
            <Paper >
              <div style={{marginLeft:'20px'}}>
               <h2><b>WORKING EMPLOYEES</b></h2>
               </div><br/>
               <Table striped bordered hover responsive>   
                  <tbody>
                  {emp.map((record)=>{
                                 return(
                    <tr>
                  
                    <th align='center'><img src={`/${record.emp_img}`} style={{height:'50px',width:'50px',borderRadius:'30px'}} alt='/Noimage'/></th>
                    <th >{record.name}</th>
                    <th>{record.role}</th>
                    </tr>
                                  )
                                })}
                  </tbody>
              </Table>
               </Paper>
            </Grid>

            <Grid style={{marginTop:'10px',marginLeft:'20px'}} item xs={6} >
            <Paper >
              <div style={{marginLeft:'20px'}}>
               <h2><b>RECENT FIVE ORDERS</b></h2>
               </div><br/>
               <Table striped bordered hover responsive>   
                  <tbody>
                  {Rorder.map((record)=>{
                                 return(
                    <tr>
                  
                    <th><img src={`/${record.product_img}`} style={{height:'50px',width:'50px',marginLeft:'40px'}}  alt='/Noimage'/></th>
                    <th >{record.product_name}</th>
                    <th>Rs.{record.total_price}</th>
                    </tr>
                                  )
                                })}
                  </tbody>
              </Table>
               </Paper>
            </Grid>
            </div>
        </Container>
      </main>
    </div>
  );
}

export default DashboardNew;