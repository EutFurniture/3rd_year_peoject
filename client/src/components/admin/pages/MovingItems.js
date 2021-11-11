import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link} from "react-router-dom";
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
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {Redirect} from "react-router-dom"
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import {toast} from 'react-toastify'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'
import {Bar} from 'react-chartjs-2'

import { mainListItems } from './listItems';
//import {Doughnut} from '../../charts/Doughnut'
//import Adminmain from "../main/Adminmain"
import '../css/Dashboard.css'

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


 



const MovingItems=()=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {todate}=useParams();
  const {fromdate}=useParams();
  const {id}=useParams();
  const [Dt, setDt] = useState([])
  const[currentmonth,setMonth]=useState("");
  const [maxanalyze,setMaxAnalyze]=useState([])
  const [minanalyze,setMinAnalyze]=useState([])

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

   const [moving,setMoving]=useState([])

  
    const Moving = async () => {
        const response = await axios.get('http://localhost:3001/MovingItems', {
            params: {
               month:currentmonth,  
            }
            
        });
   
        setMoving(response.data);
           console.log(response.data[0]);

           const response1 = await axios.get('http://localhost:3001/MaxItem', {
            params: {
               month:currentmonth,  
            }
            
        });
            setMaxAnalyze(response1.data)
         

         const response2= await axios.get("http://localhost:3001/MinItem",{
          params: {
            month:currentmonth,  
         }
          })
          setMinAnalyze(response2.data)
   
    }

   

  const product_name=maxanalyze.map(record=>record.name);
  
  const slow_name=minanalyze.map(record=>record.name);
  
const name=moving.map(record=>record.name);
const count=moving.map(record=>record.sum);

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
          
           
           
               <h1><b>FAST AND SLOW MOVING ITEMS</b></h1><br/>
               <div style={{display:'flex'}}>
                   <div style={{width:'900px'}}>
               <Grid >
              <Paper style={{height:'70px'}}>
                  <div style={{display:'flex'}}>
                  <h4 style={{color:'red',marginLeft:'10px',paddingTop:'10px',marginTop:'10px'}}>Enter Month</h4>
                  <input type='number' style={{width:'200px',border:'none',backgroundColor:'aliceblue',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='month no' 
                   onChange={(event)=> {
                    setMonth(event.target.value);
                  }} ></input>
                  <button style={{marginLeft:'30px',fontSize:'20px',width:'150px',height:'50px',backgroundColor:'#0070ff',border:'none',borderRadius:'10px',color:'white',marginTop:'10px'}}
                  onClick={()=>{Moving()}}>Click to View</button>
                  </div>
              </Paper>
              </Grid><br/>
              
               <Grid  >
                          <Paper style={{width:'900px'}}>
                      <br/>
                       <h2 style={{marginLeft:'20px'}}><b>Categorywise Order Anaylze</b></h2>
                     
                       <Bar  style={{width:'1100px',marginLeft:'10px'}}
      data={{
        labels:name,
        datasets:[{
          label:'No of Orders',
          data:count,
          backgroundColor:'#6495ed',
          barThickness:18
        },
        
        
        ]
      }}
      options={{
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(toolTipItem){
              return ("Revenue: $"+toolTipItem.value)
            }
          }

        },
        scales:{
          xAxes:[
            {
              gridLines:{
              color:'cyan'
            },
              scaleLabel:{
                labelString:'Months',
                display:true,
                fontColor:'blue',
                fontSize:20
              },
              ticks:{
                fontColor:'green'
              }
            }
          ],
          yAxes:[
          {
            gridLines:{
              color:'cyan'
            },
            scaleLabel:{
                labelString:'Revenue',
                display:true,
                fontColor:'red',
                fontSize:20,
              },
            ticks:{
              beginAtZero:true,
              fontColor:'green',
              
            }
          }
          ]
        }
      }}
      >

      </Bar>     
              </Paper>
            </Grid>
            </div>
            <div style={{width:'300px',marginLeft:'10px'}}>
            <Grid  >
              <Paper style={{align:'center',marginLeft:'20px',backgroundColor: '#045de9',backgroundImage:'linear-gradient(315deg, #045de9 0%, #09c6f9 74%)',height:'230px',borderRadius:'20px'}}>
                  <h4 style={{color:'white',marginLeft:'50px',marginTop:'50px',paddingTop:'20px'}}>Fast Moving Item</h4>
             <TrendingUpIcon style={{marginLeft:'100px',width:'100px',height:'120px',color:'white'}}/>
             <h5 style={{textAlign:'center'}}>{product_name}</h5>
              </Paper><br/>
              <Paper style={{align:'center',marginLeft:'20px',backgroundColor: '#045de9',backgroundImage:'linear-gradient(315deg, #045de9 0%, #09c6f9 74%)',height:'230px',borderRadius:'20px'}}>
                  <h4 style={{color:'white',marginLeft:'50px',paddingTop:'20px'}}>Slow Moving Item</h4>
             <TrendingDownIcon style={{marginLeft:'100px',width:'100px',height:'120px',color:'white'}}/>
             <h5 style={{textAlign:'center'}}>{slow_name}</h5>
              </Paper><br/>
              </Grid>  
            </div>
            </div>
            </Grid> 

        </Container>
      </main>
    </div>
  );
}

export default MovingItems;