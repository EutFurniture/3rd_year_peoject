

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { mainListItems,Logo } from './listItems';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {toast} from 'react-toastify';
import Title from './Title';
//import { grey } from '@material-ui/core/colors';

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
    overflow: 'auto',
    flexDirection: 'column',
   
  },

  fixedHeight: {
    height: 240,
  },
  imageInput:{
    border:'none',
    borderColor:'white',
    color: 'grey'
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



export default function Sales_UpdateProfile() {


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',product_img:'',message:'',success:false})
  const[newName,setNewName]=useState();
  const[newEmail,setNewEmail]=useState();
  const[newPhone_no,setNewPhone_no]=useState();
  const[newAddress,setNewAddress]=useState();
  const[newEmp_img,setNewEmp_img]=useState();

  const {id} = useParams();
  const [Dt, setDt] = useState([])

  
  const [AdminList,setAdminList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/load_sManager").then((response)=>{
      setAdminList(response.data)
    })
  },[])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/view_sManager', {
              params: {
                  id: id,
                  
              }
          });
    
          setDt(response.data[0]);
          setNewName(response.data[0].name)
          setNewEmail(response.data[0].email)
          setNewAddress(response.data[0].address)
          setNewPhone_no(response.data[0].phone_no)
          setNewEmp_img(response.data[0].emp_img)
         
         
      };
      fetchData();
    }, [id]);
    
    const updateProfile = (id) => {
      if(state.file)
      {
        let formData=new FormData();
        formData.append('file',state.file) 
        axios.post('http://localhost:3001/imageUpload',formData,{
            'content-Type':'multipart/form-data',
          })
    
      axios.put("http://localhost:3001/sales_updateProfile", { name: newName,email:newEmail,phone_no:newPhone_no,address:newAddress,emp_img:state.file.name,id:id}).then(
        (response) => {
          
          setAdminList(Dt.map((val) => {
            return val.id === id ? {id: val.id,name: val.name, email: val.email,phone_no:val.phone_no,address:val.address,emp_img:val.emp_img,
                name: newName,email:newEmail,phone_no:newPhone_no,address:newAddress,emp_img:newEmp_img} : val
            
          }))
        }
        )
    
      alert("Profile Edited successfully")  
      
        }
      
   
      
    };

    const handleInput =(e) =>{
      let reader =new FileReader();
      let file=e.target.files[0]
      reader.onloadend =() =>{
        setState({
          ...state,
          file:file,
          userImage:reader.result,
          message:""
        })
       
      }
      reader.readAsDataURL(file);
    }

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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}}>{Logout}</List>
        <Divider /> */}
      
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={18}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={11} direction="row"  >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <Title>Update Profile</Title>
            </Typography><br/>
            <Form >

<Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
    Full Name :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newName}
       onChange={(event)=> {
         setNewName(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalPrice">
     <Form.Label column lg={2} >
    Email :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newEmail} 
       onChange={(event)=> {
         setNewEmail(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
  
   

   <Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
     <Form.Label column lg={2}>
     Profile Image :</Form.Label>
     <Col >
     <Form.Control type="file"  defaultValue={newEmp_img} className={classes.imageInput}
      onChange={handleInput}
     />                  
     </Col>
     </Form.Group>  

<Form.Group as={Row} controlId="formHorizontalQuantity">
     <Form.Label column lg={2} >
    Phone No:
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newPhone_no}
       onChange={(event)=> {
         setNewPhone_no(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalDescription">
     <Form.Label column lg={2} >
    Address :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newAddress}
       onChange={(event)=> {
         setNewAddress(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
   
                       
{/* <Form.Group as={Row} controlproduct_id="formHorizontalCategory">

     <Form.Label column lg={2} >
     Product Category :
     </Form.Label>
     <Col >
       <Form.Control as="Select" name='type' onChange={(event)=> { setCategory(event.target.value); }}>
       {typeList.map((record)=>{return(
       <option value={record.name}>{record.name}</option>
       )
      })}
      
      
       </Form.Control>  
     </Col>
   </Form.Group><br/> */}

   
   
       <div align="center">
       <Button  type="submit" onClick={() => {updateProfile(Dt.id)}}  style={{fontSize:'20px',width:'200px'}} >Update</Button>
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

