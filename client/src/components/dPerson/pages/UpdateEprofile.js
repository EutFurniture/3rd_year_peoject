import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import clsx from 'clsx';
import { Redirect, useParams, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Fragment } from "react";
import { DpListItems, Logo } from './dplistItems';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
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
  } ,
  updatebtn:{
    backgroundColor: '#0C1385',
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
const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};


export default function UpdateEprofile(userData) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { id } = useParams();
  const [Dt, setDt] = useState([])
  const [newName, setNewName] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newPhone_no, setNewPhone_no] = useState();
  const [newEmp_img, setNewEmp_img] = useState();
  const [state, setState] = useState({ file: '', name:" ", description: '', emp_img: "", message: "", success: false })
  const [employeeList, setEmployeeList] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/dpprofile', {
        params: {
          id: userData.userData.id,

        }
      });

      setDt(response.data[0]);
      setNewName(response.data[0].name);
      setNewAddress(response.data[0].address)
      setNewPhone_no(response.data[0].phone_no)
      setNewEmp_img(response.data[0].emp_img)
      console.log(response.data[0]);
    };
    fetchData();
  }, [id]); 
  

  const updateEmployeeProfile = (id) => {

    if(state.file)
    {
   
      let formData = new FormData();
      formData.append('file', state.file)
    
      axios.post('http://localhost:3001/imageUpload', formData, {

        'content-Type': 'multipart/form-data',
      })
     

        axios.put("http://localhost:3001/updateEmployeeProfile", {name: newName, address: newAddress, emp_img:state.file.name ,  phone_no: newPhone_no,   id: id}).then(
        (response) => {

          setEmployeeList(Dt.map((val) => {
            return val.id === id ? {
              id: val.id, name: val.name, address: val.address,  emp_img: val.emp_img, phone_no: val.phone_no,
              name: newName, address: newAddress, emp_img: newEmp_img, phone_no: newPhone_no
            } : val

          }))
        }
      )
      alert("Employee Edited successfully")
      }
  };

  const handleInput = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0]
    reader.onloadend = () => {
      setState({
        ...state,
        file: file,
        emp_img: reader.result,
        message: ""
      })

    }
    reader.readAsDataURL(file);
  }     



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
           <AccountCircleIcon   onClick={handleClick}/>
  
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

<Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
  <strong> UPDATE PROFILE DETAILS </strong>
</Typography><br />

<Form >


  <Form.Group as={Row} controlId="formHorizontalName">
    <Form.Label column lg={2} >
       Name :
    </Form.Label>
    <Col >
      <Form.Control type="text" defaultValue={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }} />
    </Col>
  </Form.Group><br />
 
  <Form.Group as={Row} controlId="formHorizontalAddress">
    <Form.Label column lg={2} >
      Address :
    </Form.Label>
    <Col >
      <Form.Control type="text" defaultValue={newAddress} onChange={(event) => {
        setNewAddress(event.target.value);
      }} />
    </Col>
  </Form.Group><br />

  <Form.Group as={Row} controlId="formHorizontalName">
    <Form.Label column lg={2} >
      Image :
    </Form.Label>
    <Col >
      <Form.Control type="file" defaultValue={newEmp_img}
        onChange={handleInput}
      />
    </Col>
  </Form.Group><br />

  <Form.Group as={Row} controlId="formHorizontalPhoneNo">
    <Form.Label column lg={2} >
      Phone No :
    </Form.Label>
    <Col >
      <Form.Control type="text" defaultValue={newPhone_no} onChange={(event) => {
        setNewPhone_no(event.target.value);
      }} />
    </Col>
  </Form.Group><br />




  <div align="center">
  <Button style={{ fontSize: '20px', width: '200px' }} type="submit" onClick={() => {updateEmployeeProfile(Dt.id)}} >
   Update
  </Button>
  </div>

</Form>
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


 