import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Axios from 'axios';
import {Table} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import  './DpDashboard.css';
import {Redirect} from "react-router-dom";
import { useState  , useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { DpListItems, Logo } from './dplistItems';
import {toast} from 'react-toastify'
//import Lines from './Lines';
import ViewProductDeliver from './ViewProductDeliver';


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
    fontSize:40,
    fontWeight:600,
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
    paddingTop: theme.spacing(6),
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
  }

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};

toast.configure()
export default function DpDashboard(userData) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [returns_count,setReturnsCount]=useState([])
  const [user,setUser]=useState([])
  const [employee,setEmployee]=useState([])
  const { employee_id } = useParams();
  const [totalcashon_income,setTotalcashonIncome]=useState([])
  const [free_count,setFree_Count]=useState([])
  const [cash_count,setCash_Count]=useState([])
  
  
  useEffect(() => {
    axios.get("http://localhost:3001/employee", {
          params: {
                email: userData.userData.email,
          }
    }).then((response) => {
          setEmployee(response.data[0])


    });

}, [])
  
  
  useEffect(() => {
  const fetchData = async () => {
  const response = await Axios.get('http://localhost:3001/empRecentOrders', {
            params: {
          employee_id: userData.userData.id
           }
        });
     
        setUser(response.data);

        console.log(employee_id);
      
    }

  const response2= axios.get("http://localhost:3001/empCountReturnItems",{
      params:{
        employee_id: userData.userData.id,
      }
    }).then((response)=>{
      setReturnsCount(response.data)
         
    })


    const response3= axios.get("http://localhost:3001/empTotalcashonIncome",{
      params:{
        employee_id: userData.userData.id,
      }
    }).then((response)=>{
       setTotalcashonIncome(response.data)
         
    })
	
    const response4= axios.get("http://localhost:3001/deliveryCount",{
      params:{
        employee_id: userData.userData.id,
      }
    }).then((response)=>{
       setFree_Count(response.data)
         
    })

    const response5= axios.get("http://localhost:3001/cashonCount",{
      params:{
        employee_id: userData.userData.id,
      }
    }).then((response)=>{
      setCash_Count(response.data)
         
    })

fetchData();
}, [employee_id]);  



	



  
 const [productList,setProductList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/viewproductFordeliver").then((response)=>{
      setProductList(response.data)
    })
  },[]) 


  
  const [pendingcount,setPendingCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/PendingCount").then((response)=>{
      setPendingCount(response.data)
    })
  },[])

  
   



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

 // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

const[isAuth,setIsAuth]=useState(true);

if(!isAuth){
    return <Redirect to="" />
}
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37, 37, 94)'}}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <b>DELIVERY PERSON</b>
          </Typography>


          <IconButton color="inherit" fontSize="inherit">
          <img src={`/${employee.emp_img}`} onClick={handleClick} class="rounded-circle" width="35" height="35" alt='/Noimage'/>
  
          </IconButton>

   <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/dPerson/DpProfile">Profile</MenuItem>
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
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{DpListItems}</List>

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

              <Paper className={fixedHeightPaper}>
                  <div className={classes.maindash}>
                    <div className='charts_left'>
                     <div className="charts_right_title">
                         <div>
                             <h1>Stats Reports</h1>
                          </div>
                          
                      </div>
                      
                      <div className="cardcollection">

                      <div className="dpcard4">
						   <h3>No of available Deliveries </h3>
                               <p style={{fontSize:'30px'}}>{free_count.map(record=>record.freecount)}</p>
                           </div>



                           <div className="dpcard2">
							 <h3>No of Returned Items</h3>
               {returns_count.map((item)=>{
                                 return(
                                  <p style={{fontSize:'30px'}}>{returns_count.map(record=>record.returncount)}</p>
                                 )
                               })}
                           </div>

                           <div className="dpcard3">
						   <h3>No of Cash on Deliveries </h3>
                               <p style={{fontSize:'30px'}}>{cash_count.map(record=>record.cashcount)}</p>
                           </div>				

                           <div className="dpcard1">
                             <h3>Cash On Payments </h3>
                            {totalcashon_income.map((record)=>{
                                 return(
                                  <p style={{fontSize:'25px'}}>Rs.{totalcashon_income.map(record=>record.eincome)}</p>
                                 )
                               })}
                           </div>
                </div>

                      
                       </div>
            
                       </div>
     <Grid style={{marginTop:'0px'}} item xs={12} >
           <Paper >
        <div style={{marginLeft:'20px', marginTop:'30px'}}>
       
         <h3><b>RECENT COMPLETED ORDERS</b></h3>
         </div>
         <Table striped bordered hover responsive>
         <thead className="tableheading">
          <tr>
             <th scope="col">Product ID</th>
             <th scope="col">Product Name</th>
             <th scope='col'>Total price</th>
          </tr>
        </thead> 


       <tbody className="tablebody">
       {user.map(item=>
          <tr >
          <td align="center">{item.product_id}</td>
          <td align="center">{item.product_name}</td>
          <td align="center">Rs. {item.total_price.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") }</td>

          </tr>
         )}
         </tbody> 
       </Table>
          </Paper>         
            </Grid>
              </Paper>
           
            </Grid>
           </Grid>
        
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
