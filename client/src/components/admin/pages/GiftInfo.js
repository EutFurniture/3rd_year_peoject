
import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'

import Divider from '@material-ui/core/Divider';


import {useParams} from "react-router-dom"


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
  profile_img:{
    width:'50px',
    height:'50px',
    borderRadius:'50px'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop:'20px',
    marginLeft:'100px',
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
textareabox:{
    border:'none',
    backgroundColor:'#E1F4FF',
},
formrow:{
 gridTemplateColumns:'1fr 3fr',
 display:'flex'
},
formleft:{
  width:'200px',
  marginTop:'20px',
  marginBottom:'30px',
  marginLeft:'20px'
},
formright1:{
  width:'800px',
  marginTop:'10px',
  marginBottom:'20px'
},
formlabel1:{
  marginBottom:'32px',
  fontSize:'16px', 
  
},
twocolumn:{
    gridTemplateColumns:'1fr 2fr', 
    display:'flex',
},
columnleft:{
    width:'300px',
    // backgroundColor:'rgb(63, 111, 199)'
},
columnright:{
width:'700px'
},

 datas:{
    marginBottom:'20px',   
 },
 user1:{
     width:'100px',
     height:'100px',
     marginTop:'20px',
     align:'center',
     marginLeft:'60px'
 }

  

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};


export default function GiftInfo() {
   
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {product_id } = useParams();
    const [Dt, setDt] = useState([])

    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/viewGift', {
              params: {
                  product_id: product_id,
                  
              }
          });
    
          setDt(response.data[0]);
             console.log(response.data[0]);
      };
      fetchData();
    }, [product_id]);
    
    const { id } = useParams();
    const [Dts, setDts] = useState([])
   
   useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/viewAdmin', {
            params: {
                id: id,  
            }
            
        });
  
        setDts(response.data[0]);
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
  
  const[isAuth,setIsAuth]=useState(true);
  
  if(!isAuth){
    return <Redirect to="" />
  }
    
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 

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
          
          <img src={`/${Dts.emp_img}`} onClick={handleClick} className={classes.profile_img} alt='/Noimage'/>
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
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={10}>
        {/* Recent Orders */}
        <Grid item xs={10}  direction="row"  >
        
        <div >
           <Paper className={classes.paper}>
               
             
            <div >
           <Typography style={{fontSize:'30px',marginLeft:'20px'}} color="inherit" align="left" width="100%" noWrap className={classes.title}>
                  <strong> GIFT INFORMATION </strong>
                </Typography>
               
                <div ><br/>
                  <div style={{display:'flex'}}><label className={classes.formlabel1}><b style={{marginRight:'65px'}}>Gift ID :</b>{Dt.product_id}</label></div>
                  <label className={classes.formlabel1}><b style={{marginRight:'30px'}}>Gift Name :</b > {Dt.product_name}</label><br/>
                  <label className={classes.formlabel1}><b>Gift Image :</b></label><br/><img style={{marginLeft:'120px'}} src={`/${Dt.product_img}`} className="image1" alt='/Noimage'/><br/><br/>
                  <label className={classes.formlabel1}><b style={{marginRight:'70px'}}>Price : </b>{Dt.price}</label><br/>       
                  <label className={classes.formlabel1}><b style={{marginRight:'40px'}}>Quantity :</b> {Dt.quantity} </label><br/>
                  </div>
            
            
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
