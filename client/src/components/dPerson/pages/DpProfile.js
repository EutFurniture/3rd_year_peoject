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
    borderRadius: '5px',
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

export default function DpProfile(userData) {
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
              <div class="d-flex flex-column align-items-center text-center" >
                 <br/>
                 <img src={`/${user.emp_img}`} alt="myprofile"  width="200" height="200" />
                 <div class="mt-3">
                   <h4>{user.name}</h4>

                   
                 </div>
               </div>
                
              <br></br>
              <div>
                

<Form >
     <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     Name :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
     {user.name}
     </Form.Label>
      </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     NIC :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
     {user.NIC}
     </Form.Label>
      </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     Email :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
     {user.email}
     </Form.Label>
      </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     Phone :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
     {user.phone_no}
     </Form.Label>
      </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     Address :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
     {user.address}
     </Form.Label>
      </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
     Job Start Date :
     </Form.Label>
     <Col >
     <Form.Label column lg={2} >
     {dateOnly(user.job_start_date)}
     </Form.Label>
      </Col>
   </Form.Group><br/>
         </Form>    

    
      
              </div>
              <div class="col-sm-12">
               <Link   style={styles.updatebtn} to={location=>`/dPerson/updateEprofile/${user.id}`} className="edit">Edit</Link>
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