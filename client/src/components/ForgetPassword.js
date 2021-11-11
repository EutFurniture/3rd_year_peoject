import "./Login.css";
import EmailIcon from '@material-ui/icons/Email';
import React, {useState} from 'react';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import login from "../assets/h8.jpeg";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as yup from "yup";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom:theme.spacing(3),
    marginRight:theme.spacing(2),
    marginLeft:theme.spacing(2),
  },
 rem:{
marginLeft:"-45.2%",
 },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  email:  yup.string().email().required('Enter the email'),
  })

function ForgetPassword() {
  const classes = useStyles();

  const[forgetStatus, setforgetStatus] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const forgetinfo = (data) => {
  
    Axios.post("http://localhost:3001/forget", {
     email: data.email,
      
    }).then((response) => {
      console.log(response)
      
      if (response.data.message) {
        setforgetStatus(response.data.message);
        alert(response.data.message)
        window.location.href='/ResetPassword'
      } 
    }
    );
  };
  
  return (
   

     <div  >
    <div className="content1"> 
   
     <div className="left-container1">
       <div className="left-container-alpha1">
        <img src={login} alt="img3" className="img3"/>  

        
       </div>
     </div>
     {/* <div className="logo">
     <h1>EUT </h1>
     </div> */}
    
     <div className="right-container1">
     
         <div className="right-container-flex1">
        
             <label className="top1" style={{fontSize:'40px'}}>
                 Forget Password
             </label>
             {/* <label className="top">
                 Your Email
             </label> */}

             <form onSubmit={handleSubmit(forgetinfo)}>

             <TextField style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
            variant="outlined"
            margin="normal"
            required
           
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register('email')}
            autoFocus
          />
                {/* <ul className='ulist'>
                  <li>
                 <EmailIcon style={{marginRight:'10px'}}/>
                  <input type="email" placeholder="Enter your Account Email" name='email' {...register('email')}   required/><br/><br/>
                  </li>
                  {errors.email?.message && <p className=" errormessage" style={{color:'red',marginLeft:'20px'}}>{errors.email?.message}</p>}
                </ul> */}
                <Button style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
            type="submit"
           
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
     
                
             </form>
             
         
      
         </div>
         
     </div>
     
    </div>
   
    </div>
    
  );
}

export default ForgetPassword;