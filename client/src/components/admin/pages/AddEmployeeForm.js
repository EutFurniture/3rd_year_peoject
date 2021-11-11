import React, { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import clsx from 'clsx';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {Redirect} from "react-router-dom"
import {toast} from 'react-toastify'
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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'

import { mainListItems } from './listItems';

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
  profile_img:{
    width:'50px',
    height:'50px',
    borderRadius:'50px'
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
  name: yup.string().required(),
  email: yup.string().email().required(),
  job_start_date: yup.string().required(),
  address: yup.string().required(),
  role: yup.string().required(),
  NIC: yup.string().max(10, "Must be 10 Characters.").min(10, "Must be 10 Characters."),
  phone_no: yup.string().max(10, "Must be 10 Digits.").min(10, "Must be 10 Digits."),
  password: yup.string().required().min(8).max(15),
  confirm_password: yup.string().when('password', (password, schema) => {
      if (password) return schema.required('Confirm Password is required');
  })
      .oneOf([yup.ref('password')], 'Passwords must match')
})


export default function AddEmployeeForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
});

  
  
  
  const addEmployee = (data)=>{

    axios.get('http://localhost:3001/validemployee',{
      params:{
        email:data.email,
        NIC:data.NIC,
      }
    }).then((response)=>{
      if(response.data.length>0){
        alert("You already have an account.");
      }
      else{
  
     axios.post('http://localhost:3001/addNewEmployee',{
       name:data.name,
       NIC:data.NIC,
       email:data.email,
       phone_no:data.phone_no,
       job_start_date:data.job_start_date,
       password:data.password,
       address:data.address,
       role:data.role,
       confirm_password:data.confirm_password,
       
  
      }).then((response)=>{
        if(response.data.message){
          alert(response.data.message)
          window.location.href='/admin/pages/ManageOTPEmp'
         
      }
       });
      }
    })
       console.log(data)
  };
  
  

  
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 
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
       console.log(response.data[0]);

};
fetchData();
}, [id]);

const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const [cusorderCount,setCusOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
  },[])

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


const Cuspage=()=>{
window.location.href='/admin/pages/CustomizedOrders'
}





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
            <b>ADMIN</b>
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List> 
        <Divider />
        <List style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>{mainListItems}</List>
       
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
                  <strong> ADD NEW EMPLOYEE DETAILS </strong>
                </Typography><br/>
        
                 
                 
                <Form onSubmit={handleSubmit(addEmployee)}>
                
                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        Full Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('name')} required />
                        {errors.name?.message && <p className=" errormessage" >{errors.name?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                       Employee Role :
                      </Form.Label>
                      <Col >
                      <Form.Control as="select" {...register('role')} >
                      <option value=" ">SELECT</option>
                          <option value="Sales Manager">Sales Manager</option>
                          <option value="Delivery Manager">Delivery Manager</option>
                           <option value="Delivery Person">Delivery Person</option>
          
                          </Form.Control>
                        {errors.name?.message && <p className=" errormessage" >{errors.name?.message}</p>}                        
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

                    <Form.Group as={Row} controlId="formHorizontalNIC">
                      <Form.Label column lg={2} >
                       NIC :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('NIC')} required />
                        {errors.NIC?.message && <p className=" errormessage" >{errors.NIC?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                      <Form.Label column lg={2} >
                       Phone No :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('phone_no')} required />
                        {errors.phone_no?.message && <p className=" errormessage" >{errors.phone_no?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalJobStartDate">
                      <Form.Label column lg={2} >
                       Job Start Date :
                      </Form.Label>
                      <Col >
                        <Form.Control type="date"   {...register('job_start_date')} required />
                        {errors.job_start_date?.message && <p className=" errormessage" >{errors.job_start_date?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                      <Form.Label column lg={2} >
                       Password :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('password')} required />
                        {errors.password?.message && <p className=" errormessage" >{errors.password?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalConfirmPassword">
                      <Form.Label column lg={2} >
                      Confirm Password :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"   {...register('confirm_password')} required />
                        {errors.confirm_password?.message && <p className=" errormessage" >{errors.confirm_password?.message}</p>}                        
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
     
        </Container>
      </main>
    </div>
  );
}
