import clsx from 'clsx';
import Axios from "axios";
import axios from "axios";
import { Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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
import {Redirect} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useParams} from 'react-router-dom'
import { Form,Row,Col } from "react-bootstrap";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DpListItems, Logo } from './dplistItems';

import { Button } from 'react-bootstrap';
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
    alignContent:'center',
    align:'center',
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
}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  },

  card:{
    display:"flex",
    flexDirection :"row",
    justifyContent:"space-between",
  },

  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  ,
  updatebtn:{
    backgroundColor: '#041957',
    width: '400px',
    textDecoration: 'none',
    height: '100px',
    marginLeft: '400px',
    border:'white',
    borderRadius:'5px',
    fontSize: '25px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    color: 'white',
    borderRadius: '20px',
    align: 'left'
  }
};


const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function AddForm(userData) {
  const [user,setUser]=useState([])
  const { id } = useParams();
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
        const response = await Axios.get('http://localhost:3001/dpprofile', {
            params: {
              id:userData.userData.id,
                
            }
        });
       
        setUser(response.data[0]);
        
    };
    fetchData();
  }, [id]);
  const [product_id, setProduct_id]= useState("");
  const [order_id, setOrder_id]= useState("");
  const [return_date, setReturn_date]= useState("");
  const [reason, setReason]= useState("");

  console.log(userData.userData.id)
   const addReturnItem = () => {
     Axios.get('http://localhost:3001/create', {
       params:{ 
      employee_id:userData.userData.id,product_id: product_id,
      order_id: order_id,
      return_date: return_date,
      reason: reason,
       },
    
    
     })
     
     Axios.get('http://localhost:3001/create_return', {
      
     params:{
      order_id: order_id,
}
     
      
   
    }).then(() => { 
      alert("Details added success");
    });
    




   };
   const [deliverList,setdeliverList]=useState([])
   useEffect(()=>{
     axios.get('http://localhost:3001/deliverid').then((response)=>{
       setdeliverList(response.data)
     })
   }, [])
  
  
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

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
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37, 37, 94)'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >

         <MenuItem component={Link} to="/dPerson/DpProfile">Profile</MenuItem>
        <MenuItem onClick={()=>setIsAuth(false)}>Logout</MenuItem>
    
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <strong>DELIVERY PERSON</strong>
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{DpListItems}</List>

      </Drawer>
      </div>
     
      <main className={classes.content}  >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}  style={styles.pack} >
          <Grid container spacing={3} >
                  
           
          <Grid item xs={10}  >
            <div >
              <Paper className={classes.paper} style={{backgroundColor: '#FFFFFF', color:'black', fontSize:15}} >

                
              <br></br>
              <div>



              <Form >
                    <div className = "info">
  

             
                    <Form.Group as={Row} controlId="formHorizontalOrder_id">
                      <Form.Label column lg={2}>
                        Order ID :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Order ID" 
                        onChange={(event)=> {
                          setOrder_id(event.target.value);
                        }}
                        />
                      </Col>
                    </Form.Group><br/>


                    <Form.Group as={Row} controlId="formHorizontalProduct_id">
                      <Form.Label column lg={2}>
                        Product ID :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Product ID" 
                        onChange={(event)=> {
                          setProduct_id(event.target.value);
                        }}
                        />
                      </Col>
                    </Form.Group><br/>


                    <Form.Group as={Row} controlId="formHorizontalReturn_date">
                      <Form.Label column lg={2}>
                        Return Date :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="date" placeholder="Return Date" 
                        onChange={(event)=> {
                          dateOnly( setReturn_date(event.target.value));
                        }}/>
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalReason">

                      <Form.Label column lg={2}>
                        Reason :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Reason" 
                        onChange={(event)=> {
                          setReason(event.target.value);
                        }}/>
                      </Col>
                    </Form.Group><br/>

             
       
                          </div>
  
                  

                    
                        <div     align='left' >
                         
                          <Button  type="submit" size='lg' href= '/dPerson/ViewProductDeliver' >View Product List</Button>
                      
                        <div     align='right' >
      
                        <Button  type="submit" size='lg'  onClick={addReturnItem}>Add Returned Items</Button>
                        </div>
                     </div>
                </Form>

    
      
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