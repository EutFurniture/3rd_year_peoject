import React, {useState} from 'react';

import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from "yup";


const schema = yup.object().shape({
    email:  yup.string().email().required('Enter the email'),
    otp: yup.string().required("Enter the otp code"),

})



function AddEmployeeOTPcheck() {

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
        window.location.href='/admin/pages/ManageEmployee'
      } 
    }
    );
  };

  return (
   
     <div  >

             <Form onSubmit={handleSubmit(otpinfo)}>
                  
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column lg={2} >
                      <PersonIcon style={{marginRight:'10px'}}/>
                        Email :
                      </Form.Label>
                      <Col >
                        <Form.Control type="email" placeholder=" Enter the Email" name='email' {...register('email')} required />
                        {errors.email?.message && <p className=" errormessage" style={{color:'red',marginLeft:'20px'}}>{errors.email?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    
                    <Form.Group as={Row} controlId="formHorizontalCode">
                      <Form.Label column lg={2} >
                      <LockIcon style={{marginRight:'10px'}}/>
                        OTP Code :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" placeholder="Enter the otp code" name="otp"  {...register('otp')} required />
                        {errors.otp?.message && <p style={{color:'red',marginLeft:'20px'}}className=" errormessage" >{errors.otp?.message}</p>}                       
                      </Col>
                    </Form.Group><br/>

                
              <div align="center">   
               <Button variant='primary' style={{fontSize:'20px',width:'200px'}} type="submit">Check</Button><br/>
              </div>
             </Form>
         </div>
    
  );
}

export default AddEmployeeOTPcheck;