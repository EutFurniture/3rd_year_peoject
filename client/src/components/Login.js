import "./Login.css";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
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
import Footer from './customer/Footer'

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
    password: yup.string().required("Enter the Password"),

})
Axios.defaults.withCredentials=true; 
function Login() {
  const classes = useStyles();
  const[LoginStatus, setLoginStatus] = useState();
  

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const logininfo = (data) => {
  
    Axios.post("http://localhost:3001/login", {
     email: data.email,
     password: data.password,
     role: data.role,
     verify: data.verify,
      
    }).then((response) => {
      console.log(response)
      
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } 
      else if((response.data[0].user_role === 'admin') && (response.data[0].u_verify === 1)){
        window.location.href='/admin/pages/DashboardNew'
      } 
      else if((response.data[0].user_role === 'Sales Manager') && (response.data[0].u_verify === 1)){
          window.location.href='/sManager/pages/Dashboard'
        } 
      else if((response.data[0].user_role === 'Delivery Manager') && (response.data[0].u_verify === 1)){
          window.location.href='/dManager/pages/Dashboard'
      }
      else if((response.data[0].user_role === 'Customer') && (response.data[0].u_verify === 1)){
        window.location.href='/customer/dashboard'
    }
    else if((response.data[0].user_role === 'Delivery Person') && (response.data[0].u_verify === 1)){
      window.location.href='/dPerson/DpDashboard'
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
        
             <label className="top1">
                 Log in
             </label>

             <form className={classes.form} onSubmit={handleSubmit(logininfo)} noValidate>
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
          {errors.email?.message && <p className=" errormessage" style={{color:'red',marginLeft:'40px'}}>{errors.email?.message}</p>}
          <TextField style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
            variant="outlined"
            margin="normal"
            required
            
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
         {errors.password?.message && <p style={{color:'red',marginLeft:'40px'}}className=" errormessage" >{errors.password?.message}</p>}

         <Grid  style={{textAlign:'right',marginRight:'35px'}}>
              <Link href="/ForgetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          
          <Button style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
            type="submit"
           
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

        
          

            <Grid style={{textAlign:'center'}} >
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          
        
            
            
          
        </form>
             <h3 style={{color:'red'}}>{LoginStatus}</h3>
         </div>
         
     </div>
     
    </div>
   
    </div>
    
  );
}

export default Login;