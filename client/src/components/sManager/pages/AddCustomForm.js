import React, { useState, useEffect} from "react";
import clsx from 'clsx';
import axios from "axios";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import Box from '@material-ui/core/Box';
//import Link from '@material-ui/core/Link'
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {Redirect} from "react-router-dom"
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
 import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Title from './Title';

import { mainListItems,Logo } from './listItems';

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
    marginTop:'20px',
    marginLeft:'40px',
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
  imageInput:{
    border:'none',
    borderColor:'white'
  },
  profile_img:{
    width:'50px',
    height:'50px',
    borderRadius:'50px'
  },
  addbutton:{
      backgroundColor:'#0000ff',
      height:'50px',
      width:'160px',
      borderRadius:'5px',
      marginRight:'10px',
      textDecoration:'none',
      textAlign:'center',
      paddingTop:'10px'
  },
  addcategorybox:{
    width: '1100px',
    height:'120px',
    backgroundColor: '#fff',
    marginLeft: '30px',
    display:'flex',
    //boxShadow:'5px 1px 2px 2px '
    
  },
  categorybtn:{
      border:0,
      backgroundColor:'#9bddff',
      width:'800px',
      height:'40px',
      marginTop:'40px',
      marginLeft:'30px',
      fontSize:'20px',
      borderRadius:'5px'

  },
  addcategory:{
    height:'40px'
  },
  categoryimage:{
    height:'500px',
    width:'1100px'
},
btn:{
    color:'white',
    fontSize:'18px',
    width:'150px',
    height:'40px',
    backgroundColor:'blue',
    border:'none',
    borderRadius:'5px'
},
addproducts:{
    display:'flex',
},

  

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};

const schema = yup.object().shape({
  fname: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  nic: yup.string().max(10, "Must be 10 Characters.").min(10, "Must be 10 Characters."),
  phone: yup.string().max(10, "Must be 10 Digits.").min(10, "Must be 10 Digits.")
})


export default function AddCustomForm() {
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
 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
});

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
  
  
  
  const addCustomer = (data)=>{

    axios.get('http://localhost:3001/validcustomer1',{
      params:{
        email:data.email,
        nic:data.nic,
      }
    }).then((response)=>{
      if(response.data.length>0){
        alert("You already have an account.");
      }
      else{
  
     axios.post('http://localhost:3001/sales_create',{
       fname:data.fname,
       nic:data.nic,
       email:data.email,
       phone:data.phone,
       address:data.address,
      
       
  
      }).then((response)=>{
      
          alert("Customer added successfully") 
          window.location.href='/sManager/pages/ManageCustom'
         
      
       });
      }
      
    })
       //console.log(data)
        

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
            <b>SALES MANAGER</b>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>

         
          {/* <IconButton color="inherit" fontSize="inherit">
           <AccountCircleIcon   onClick={handleClick}/>
  
          </IconButton> */}
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List> 
        <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
        {/* <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}} onClick={()=>setIsAuth(false)}>{Profile}</List>
        <Divider/>
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'red'}} onClick={()=>setIsAuth(false)}>{Logout}</List>
        <Divider/> */}
      </Drawer>
      </div>
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={10}>
        {/* Recent Orders */}
        <Grid item xs={11}  direction="row"  >
        
        <div >
           <Paper className={classes.paper}>
               
           <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                  <Title> Add New Customer </Title>
                </Typography><br/>
        
                 
                 
                <Form onSubmit={handleSubmit(addCustomer)}>
                
                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        First Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('fname')} required />
                        {errors.fname?.message && <p className=" errormessage" >{errors.fname?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>
                    {/* <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        Last Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('lname')} required />
                        {errors.lname?.message && <p className=" errormessage" >{errors.lname?.message}</p>}                        
                      </Col>
                    </Form.Group><br/> */}
                    <Form.Group as={Row} controlId="formHorizontalNIC">
                      <Form.Label column lg={2} >
                       NIC :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('nic')} required />
                        {errors.nic?.message && <p className=" errormessage" >{errors.nic?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column lg={2} >
                       Email :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('email')} required />
                        {errors.email?.message && <p className=" errormessage" >{errors.email?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalAddress">
                      <Form.Label column lg={2} >
                       Address :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('address')} required />
                        {errors.address?.message && <p className=" errormessage" >{errors.address?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                      <Form.Label column lg={2} >
                       Phone No :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('phone')} required />
                        {errors.phone?.message && <p className=" errormessage" >{errors.phone?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <div align="center">
                     <Button  style={{fontSize:'20px',width:'200px'}} type="submit"  >Submit</Button>
                     </div> 
                   
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
