import React, { useState, useEffect } from "react";
import Axios from 'axios';
import axios from 'axios';
import { useParams ,Link} from "react-router-dom";
import {Table} from 'react-bootstrap';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Redirect} from "react-router-dom";
import ViewConDelivery from './ViewConDelivery'
import { DpListItems, Logo } from './dplistItems';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop:'20px',
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
  addbutton:{
      backgroundColor:'#0000ff',
      height:'50px',
      width:'160px',
      borderRadius:'5px',
      marginRight:'50px',
      textDecoration:'none',
      textAlign:'center',
      paddingTop:'10px'
  },
  

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  },
  viewbtn:{
    backgroundColor: '#33b5e5',
    width: '200px',
    textDecoration: 'none',
    height: '100px',
    marginRight: '5px',
    fontSize: '17px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    color: 'white',
    borderRadius: '7px',
  } 
};


export default function ViewAvailableDelivery(userData) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [user,setUser]=useState([])
  const { employee_id } = useParams();
  const [employee,setEmployee]=useState([])
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
      const response = await Axios.get('http://localhost:3001/viewAvailableDelivery', {
            params: {
          employee_id: userData.userData.id
           }
        });
     
        setUser(response.data);

        console.log(employee_id);
      
    }
  fetchData();
  }, [employee_id]);      



  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


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
        <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{DpListItems}</List>

      </Drawer>
      </div>
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        
        <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
        
        <div >
        
           <Paper className={classes.paper}>
               
                <Typography  component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <h4> DETAILS OF DELIVERIES</h4>
                </Typography>
               
                <div ><br/>
                <div className='box-main'>
                           
                </div>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
          <th scope="col">Order ID</th>
            <th scope="col">Customer Name</th>
            <th scope='col'>Address</th>
            <th align="center">Phone Number</th>
            <th scope='col'>Action</th>
          </tr>
        </thead> 
     
       <tbody className="tablebody">
       {user.map(item=>
               <tr >
              <td align="center">{item.order_id}</td>
              <td align="center">{item.fname}</td>
              <td align="center">{item.address}</td>
              <td align="center">{item.phone}</td>
              <td align="center">
              <Link style={styles.viewbtn} to={location=> `/dPerson/AvailableDeliveryInfoRoute/${item.order_id}`}> View </Link>
         </td>

     </tr>
 )}
                            
   
        </tbody> 
      </Table>
    
   </div>
                     
          </Paper>
          </div>
        </Grid>

      </Grid>
        </Container>
        <Copyright/>
      </main>
    </div>
  );
}


 