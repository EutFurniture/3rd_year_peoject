import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import {toast} from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
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
import {Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom"
//import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
//import { Row } from 'react-bootstrap';
//import { Col } from 'react-bootstrap';
import Title from './Title';
import { Table } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';

import { mainListItems, Logo} from './listItems';
//import Title from './Title';


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
  // menuButtonHidden: {
  //   display: 'none',
  // },
  title: {
    flexGrow: 1,
    fontSize:40,
    fontWeight:600,
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
  user1:{
    width:'150px',
    height:'150px',
    marginTop:'20px',
    align:'center',
    marginLeft:'60px',
    borderRadius:'80px'
},
  paper: {
    position:'relative',
    align:'center',
    padding: theme.spacing(2),
    display: 'flex',
    width: '980px',
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
  product_img:{
    width:'100px',
    height:'75px',
    //borderRadius:'50px'
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
  },
 
  
};



export default function Sales_ViewProduct() {

    // const dateOnly = (d) => {
    //     const date = new Date(d);
    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1;
    //     const day = date.getDate();
    //     return `${year} - ${month} - ${day}`;
    //   };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  

  const { id } = useParams();
  const [Dt, setDt] = useState([])

  const [searchTerm,setSearchTerm]=useState("");
 
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

const [productList,setProductList]=useState([])
useEffect(()=>{
  axios.get("http://localhost:3001/sales_viewproduct").then((response)=>{
    setProductList(response.data)
  })
},[])     

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Go_product_order=()=>{
    window.location.href='/sManager/pages/AddOrderItemForm'
    };


  

    
    const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }


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
            <strong>Sales Manager</strong>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
          
          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img} alt="Profile Img"/>
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Profile}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider /> */}
        
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
        
            
            

        {/* Recent Orders */}
        <Grid item xs={10} style={styles.pack} >
        

        <div >
          <Paper className={classes.paper}>
          <div align="left">
<Button  style={{fontSize:'20px',width:'200px'}} type="submit" onClick={Go_product_order}><ChevronLeftIcon/> Back</Button>
</div>
          <Typography component="h1" variant="h6" color="inherit"  width="100%" noWrap className={classes.title}>
          <Title><h4 align="center">Products</h4></Title>
        </Typography><br/>

        <div className="searchbar">
        <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search by Name"/>
        <SearchIcon  className='searchicon'/>
        </div>
        <br/>
      <Table striped bordered hover responsive>
    <thead className="tableheading">
      <tr>
         <th scope="col">ID</th>
         <th scope="col">Name</th>
         <th scope="col">Price</th>
         <th scope="col">Image</th>
        </tr>
    </thead> 
 
   <tbody className="tablebody">
   {productList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ) 
                     {
                       return val
                     }
                    }).map(item=>
            <tr >
            <td align="center"><br/>{item.product_id}</td>
            <td align="center"><br/>{item.product_name}</td>
            <td align="center"><br/>Rs. {item.price}</td>
            <td align="center"><img src={`/${item.product_img}`} className={classes.product_img} alt="Product Img"/></td>
            
</tr>
)}
</tbody> 
  </Table>
  <br/>
 
        
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

