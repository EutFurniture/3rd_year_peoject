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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from "react-router-dom";

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
  password: yup.string().required("Enter the Password"),
  otp: yup.string().required("Enter the otp code"),
  c_password: yup.string().when('password', (password, schema) => {
    if (password) return schema.required('Confirm Password is required');
})
    .oneOf([yup.ref('password')], 'Passwords must match')
})


function ResetPassword() {
  const classes = useStyles();

  const[ResetStatus, setResetStatus] = useState();
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const Resetinfo = (data) => {
  
    Axios.post("http://localhost:3001/ResetPassword", {
     otp:data.otp,
     password: data.password,
     c_password: data.c_password,
      
    }).then((response) => {
      console.log(response)
      
      if (response.data.message) {
        setResetStatus(response.data.message);
        alert(response.data.message)
        window.location.href='/'
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
                Reset Password
             </label>

             <div style={{fontWeight:'bold',color:'green', fontSize:'20px'}}>Please Check Your Mail To Get Your OTP Code</div>
             <form onSubmit={handleSubmit(Resetinfo)}>
             <TextField style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
                variant="outlined"
                margin="normal"
                required
              
                id="otp"
                label="Your OTP"
                name="otp"
                autoComplete="otp"
                {...register('otp')}
                autoFocus
              > 
            </TextField>     
            {errors.otp?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.otp?.message}</p>}

            <TextField style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
                variant="outlined"
                margin="normal"
                required
              
                id="password"
                label="Your New Password"
                name="password"
                autoComplete="password"
                {...register('password')}
                autoFocus
              > 
            </TextField>     
            {errors.password?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.password?.message}</p>}

            <TextField style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
                variant="outlined"
                margin="normal"
                required
              
                id="password"
                label="Confirm New Password"
                name="c_password"
                autoComplete="c_password"
                {...register('c_password')}
                autoFocus
              > 
            </TextField>     
            {errors.c_password?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.c_password?.message}</p>}
                 

            <Button style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
                type="submit"
              
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset
          </Button>
               
                <div className="login" align="center">
                <Link style={{fontSize:'15px'}} to="/signin">Login?</Link>
                </div>

          </form>          
         </div>
         
     </div>
     
    </div>
   
    </div>
    
  );
}

export default ResetPassword;