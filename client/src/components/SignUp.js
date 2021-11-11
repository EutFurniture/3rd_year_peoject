import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from'axios';
import './sign.css';
import login from "../assets/h8.jpeg";
import { Fragment } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom:theme.spacing(1),
    marginRight:theme.spacing(2),
    marginLeft:theme.spacing(4),
  },
  
  form: {
    width: '95%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 otp: {
    margin: theme.spacing(1,8),
  },
  sign:{
    fontWeight:'bold',
    marginBottom:"5%",
  },
  errormessage:{
    color:'red',
    fontSize:'16px'
  }
}));
const schema = yup.object().shape({
  fname: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  nic: yup.string().max(10, "Invalid Format").min(10, "Invalid Format") ,

  // nic: yup.string().max(12, "Invalid Format").min(12, "Invalid Format"),

   

  // nic: yup.string().required().min(10, "Must be 10 Characters.").max(10, "Must be 10 Characters."),
  phone: yup.string().required().min(10, "Must be 10 Characters").max(10, "Must be 10 Characters"),
  cpassword: yup.string().when('password', (password, schema) => {
      if (password) return schema.required('Confirm Password is required');
  })
      .oneOf([yup.ref('password')], 'Passwords must match')
})
export default function SignUp() {
  const classes = useStyles();
  
  Axios.defaults.withCredentials=true;
 


  const { register , handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  
  const otpinfo=async(data)=>{

    Axios.get('http://localhost:3001/validcustomer',{
      params:{
        email:data.email,
        nic:data.nic,
      }
    }).then((response)=>{
      if(response.data.length>0){
        alert("You already have an account.");
      }
      else{
        Axios.post('http://localhost:3001/customerRegister',{
          fname:data.fname,
          email:data.email,
          phone:data.phone,
          address:data.address,
          password:data.password,
          cpassword:data.cpassword,
          nic:data.nic,
          
        
      }).then((response) => { 
        if(response.data.message){
          alert(response.data.message)
      
          window.location.href='/manageotp'
        }
      });
      }
    })
    
  
}
  return (
    <Fragment>
    <div className="cont">
    <div className="contactbox">
  <div className="left"> 
  <img src={login} alt="img3" style={{width:'450px',height:'700px'}}/>  
   </div>
    <Container  >
     
     
      <div className={classes.paper} style={{marginTop:'1px'}}>
        
        <Typography component="h1" className={classes.sign} variant="h4">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(otpinfo)} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="fullname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
               
                {...register('fname')}
                
              />
               {errors.fname?.message && <p className={classes.errormessage} >{errors.fname?.message}</p>}  
            </Grid>
           
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                
               
              />
               {errors.email?.message && <p className={classes.errormessage} >{errors.email?.message}</p>}  
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                name="nic"
                type="nic"
                autoComplete="nic"
                {...register('nic')}
               
               
              />
              {errors.nic?.message && <p className={classes.errormessage} >{errors.nic?.message}</p>}
            </Grid>
          
        
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                {...register('address')}
              />
               {errors.address?.message && <p className={classes.errormessage} >{errors.address?.message}</p>}  
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone no"
                name="phone"
                type="phone"
                autoComplete="phone"
                {...register('phone')}
              />
               {errors.phone?.message && <p className={classes.errormessage} >{errors.phone?.message}</p>}  
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                
              />
               {errors.password?.message && <p className={classes.errormessage} >{errors.password?.message}</p>}  
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="conform-password"
                {...register('cpassword')}
              />
               {errors.cpassword?.message && <p className={classes.errormessage}>{errors.cpassword?.message}</p>}  
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
           
          >
               Sign UP
           
              
                
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
      </div>
      </div>
      
     </Fragment>
    
  );
}
