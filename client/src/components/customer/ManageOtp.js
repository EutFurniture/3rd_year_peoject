import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import * as yup from "yup";
import "../Login.css";
import login from "../../assets/h8.jpeg";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(9),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom:theme.spacing(5),
        marginRight:theme.spacing(1),
        marginLeft:'27%',
        backgroundColor:'white',
        width:'50%',
        justifyContent:'center',
        
      },
      
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        width:'200px',
        fontSize:'18px'
      },
     otp: {
        margin: theme.spacing(1,8),
      },
      sign:{
        fontWeight:'bold',
        marginBottom:'7%',
        marginTop:'4%'
      }
    }));
const schema = yup.object().shape({
    email:  yup.string().email().required('Enter the email'),
    otp: yup.string().required("Enter the otp code"),

})

function ManageOtp() {
      const classes = useStyles();
  const[otpStatus, setotpStatus] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  const otpinfo = (data) => {
  
    Axios.post("http://localhost:3001/otpCheck", {
     email: data.email,
     otp: data.otp,
      
    }).then((response) => {
      console.log(response)
      if (response.data.message) {
        setotpStatus(response.data.message);
        alert(response.data.message)
        window.location.href='/signin'
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
        
             <label className="top2">
                OTP Verification
             </label>

             <form className={classes.form} onSubmit={handleSubmit(otpinfo)} >
               <Grid>
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
           {errors.email?.message && <p className=" errormessage" style={{color:'red',marginLeft:'20px'}}>{errors.email?.message}</p>}                        
            </Grid>
            <Grid>
          <TextField style={{width:'380px',marginLeft:'40px',marginRight:'20px'}}
            variant="outlined"
            margin="normal"
            required
            
            name="OTP"
            label="OTP"
            type="otp"
            id="otp"
            
            {...register('otp')}
          />
          {errors.otp?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.otp?.message}</p>}      
          </Grid>      
          <div align ="center" >
            <Button type="submit"  variant="contained" color="primary" className={classes.submit}>Check</Button>
          </div>   
           
              
                
          
           
        
            
            
          
        </form>
             {/* <h3 style={{color:'red'}}>{LoginStatus}</h3> */}
         </div>
         
     </div>
     
    </div>
   
    </div>
    
    
    

   
    
  );
}

export default ManageOtp;