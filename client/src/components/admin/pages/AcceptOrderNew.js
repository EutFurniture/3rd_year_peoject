import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import clsx from 'clsx';
import "react-notifications-component/dist/theme.css"

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
import {useParams} from 'react-router-dom'
import { mainListItems } from './listItems';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'

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
  paper: {
    position:'relative',
    align:'center',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft:'200px',
    marginTop:'70px'
   
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
  },
 
  
};

toast.configure()

export default function AcceptOrder() {

  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',product_img:'',message:'',success:false})
  
  const {customer_id} = useParams();
  const [Dt, setDt] = useState([])
  const [newdelivery_date, setNewDelivery] = useState();
  const [advanced, setNewAdvanced] = useState();
  const [total, setNewTotal] = useState();
  const[cusname,setCusName]=useState("");
  const [Cus, setCus] = useState([])
 
  const [CusProduct, setCusProduct] = useState([])
  const [pList,setPList]=useState([])
  

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/ViewCustomerOrder', {
            params: {
               customer_id:customer_id,
                
            }
        });
  
   setCus(response.data[0]);
   const response3 = await axios.get('http://localhost:3001/ViewCusOrder', {
    params: {
        cus_product_id:cus_product_id,  
    }
    
}); 
setCusProduct(response3.data[0]);
        
    };
    fetchData();
  }, [customer_id]);

  



  const [categoryList,setCategoryList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadcusorder").then((response)=>{
     setCategoryList(response.data)
   })
 },[])


    
    
 const [orderview1,setOrderView1]=useState([])
 const {cus_product_id}=useParams();
  
  
  const updateCustomized = async (customer_id,cus_product_id) => {
    const response1 = await axios.get('http://localhost:3001/ViewCustomizedOrder1', {
        params: {
            cus_product_id:cus_product_id,  
        }
        
    });
    setOrderView1(response1.data);
    const product_img=response1.data[0].design;
    const product_name=response1.data[0].product_name;
    const material=response1.data[0].material;
    const description=response1.data[0].description;
    const color=response1.data[0].color;

    axios.get('http://localhost:3001/addCustomizedProduct1',
  {
    params:{
    product_img:product_img,
   product_name:product_name,
   material:material,
   description:description,
   price:total,
   color:color,
    }
    })

    axios.get('http://localhost:3001/InsertCustomizedOrder1',{
       params:{
        customer_id:customer_id,
        total:total,
        }
    })
   notify1();
      
  };

  const [o_id,setOID]=useState([])
  const [p_id,setPID]=useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:3001/getorder_id1",{
        params: {
            customer_id: customer_id,  
              
          }  
    }).then((response)=>{
        setOID(response.data);
    })
  },[])

          const order_id = o_id.map(record=>record.order_id); 
          const total_price = o_id.map(record=>record.total_price);   
          
          useEffect(()=>{
            axios.get("http://localhost:3001/getproductid1",{
                
            }).then((response)=>{
                setPID(response.data);
            })
          },[])
  
          const product_id = p_id.map(record=>record.product_id);  
     



  const InsertOrderItem = () => {

  axios.get('http://localhost:3001/insertCustomizeditem1',{
       params:{
        order_id:order_id,
        product_id:product_id,
         total_price:total_price,
        }
    }).then((response)=>{
    window.location.href='/CustomizeOrder'
    })
  };

  const customToast1=()=>{
    return(
      <div>
        Your message has been sent
      </div>
    )
  }

  const notify1=()=>{
   
    toast.info(customToast1,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
  
  
      }

 
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
  

const Cuspage=()=>{
window.location.href='/CustomizeOrder'
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
            <strong>ADMIN</strong>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
          
          <img src={`/${Dts.emp_img}`} onClick={handleClick} className={classes.profile_img}/>
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logo}</List> 
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        
      
      </Drawer>
      </div>
      <main  className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={20} >
        
            
            

            {/* Recent Orders */}
            <Grid item xs={10} direction="row"  >
            
           
            <div >
              <Paper className={classes.paper}>
                  <div display='flex'>
              <Typography component="h2" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>ORDER ACCEPTANCE</strong>
              <HighlightOffIcon style={{marginLeft:'320px',color:'white',backgroundColor:'red'}}  onClick={() => { InsertOrderItem();}}/>
            </Typography>
         
            </div>
            <br/>
            <p style={{marginLeft:'20px',color:'red',fontSize:'18px'}}>Dear {Cus.fname}, <br/>Your Order has been accepted. You can continue your payment process.</p>
             
            <Form>
             


   

   <Form.Group as={Row} controlId="formHorizontalPrice">
     <Form.Label column lg={2} style={{marginLeft:'30px'}} >
    Unit Price :
     </Form.Label>
     <Col >
       <Form.Control type="text"  onChange={(event)=> {
         setNewTotal(event.target.value);
       }}
     
       />
     </Col>
   </Form.Group><br/>
  
   
  <div display='flex' align="center">
       <Button  type="submit"   style={{fontSize:'20px',width:'200px'}} onClick={() => {updateCustomized(customer_id,cus_product_id);}} >Send</Button>
     
       </div><br/><br/>
       <div >
      
       </div>

</Form>
{/* <Home />  */}
            
              </Paper>
              
              </div>
             
            </Grid>
 
          </Grid>
          
         
        </Container>
      </main>
    </div>
  );
}

  
