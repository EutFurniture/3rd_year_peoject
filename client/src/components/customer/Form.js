import React ,{Fragment}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Blog from './blog/Blog';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';



//import { mainListItems, Logout } from './listItems';


 const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  
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
    fontSize:'25px',
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
    left:"30%",
  },
  container: {
    paddingTop: theme.spacing(-2),
    paddingBottom: theme.spacing(4),
    alignContent:'center',
    align:'center',
    
  },
  paper: {
    position:'relative',
    align:'center',
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
   
  },
  fixedHeight: {
    height: 240,
  },
  mess:{
    color:"red",
    marginLeft:"17%",
  },
  lab:{
    color:'black',
  },
  
}));

const styles = {
  side:{
    backgroundColor:'#5e35b1',
  },
  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  ,
  button_style:{
    display:'flex',
    justifyContent:'space-between',
  }
  
};

export default function Customization(userData) {
  
  const classes = useStyles();
  const [state,setState]=useState({file:'',name:'',description:'',userImage:"",message:"",success:false})
  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[measurement,setMeasurement]=useState("");
  const[material,setMaterial]=useState("");
  const[color,setColor]=useState("");
  const { customer_id } = useParams();
  
const id=userData.userData.customer_id;
  const submitForm =(e) =>{
    e.preventDefault();
      
    if(state.file)
    {
      let formData=new FormData();
      formData.append('file',state.file)
     

     Axios.post('http://localhost:3001/imageUpload', formData,{
     
    'content-Type':'multipart/form-data',
    
        
        
      })
      Axios.post('http://localhost:3001/customization', {
     
       
            image:state.file.name,
            name:name,
            description:description,
            measurement:measurement,
            color:color,
            material:material,
            customer_id:id,
            
          })
        alert("Thank you! We check whether your submitted product can manufacture or not. ")

    }else{
      setState({
        ...state,
        message:'please select image'
      })
     
    }

  }

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

  
  
  return (
    <Fragment>
 
      <div >
       
      
      
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={10} style={styles.pack} >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  width="100%" noWrap className={classes.title}>
              <strong>Make Customized order</strong>
            </Typography><br/>

                 <Form  onSubmit={submitForm} >
                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label className={classes.lab} column lg={2} >
                        Product Name :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="chair,table and etc" 
                        onChange={(event)=> {
                          setName(event.target.value);
                        }}
                        required
                        />
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalNIC">
                      <Form.Label className={classes.lab} column lg={2}>
                       Description :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="Description" 
                        onChange={(event)=> {
                          setDescription(event.target.value);
                        }}
                        />
                      </Col>
                    </Form.Group><br/>
                    <Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
                      <Form.Label className={classes.lab} column lg={2}>
                        Upload Design :</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="file"  name="img"
                        onChange={handleInput}
                          
                       />
                      </Col>
                      </Form.Group>  
                      {state.message && <h6 className={classes.mess}>{state.message}</h6>}            
                      <div>
                 {state.userImage && (<img src={state.userImage}  width="10%" height="10%" alt="preview" />)}
               </div>
                    <Form.Group as={Row} controlId="formHorizontaladdress">
                      <Form.Label className={classes.lab} column lg={2}>
                      Measurement:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="W*H" 
                        onChange={(event)=> {
                          setMeasurement(event.target.value);
                        }}/>
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalmaterial">
                      <Form.Label className={classes.lab} column lg={2}>
                       Material :
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" placeholder="type" 
                        onChange={(event)=> {
                          setMaterial(event.target.value);
                        }}
                        required/>
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalcolor">
                      <Form.Label className={classes.lab}  column lg={2}>
                       Color :
                      </Form.Label>
                      <Col sm={2}>
                        <Form.Control type="color"  
                        onChange={(event)=> {
                          setColor(event.target.value);
                        }}/>
                      </Col>
                    </Form.Group><br/>

                                   

                    
                        <div  style={styles.button_style}>
                       
                        <Button  type="submit"  size='lg' >Submit</Button>
                        </div>
           
                </Form>
               
              </Paper>
              </div>
            </Grid>
         
          </Grid>
          
          <Box pt={4}>
           
          </Box>
        </Container>
       
      </main>
    </div>
   <Footer />
    </Fragment>
  );
}