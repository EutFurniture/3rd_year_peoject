import "../css/manageEmployee.css";
import SearchIcon from '@material-ui/icons/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";



export default function LoadPayment() {
  const [searchTerm,setSearchTerm]=useState("");
  const [paymentList,setPaymentList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadPayment").then((response)=>{
     setPaymentList(response.data)
   })
 },[])
    return(
     <div><br/>
      <div className="searchbar">
      <SearchIcon  className='searchicon1'/>
                   <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} s placeholder="Search"/>
                  
                    </div><br/><br/>

        <Table  striped bordered hover responsive >
        <thead className="tableheading">
          <tr>
            <th scope="col">Payment ID</th>
            <th scope="col">Customer Name</th>
            <th scope='col'>Method</th>
            <th scope='col'>Total Price</th>
            <th scope='col'>Advanced Price</th>  
            <th scope='col'>Order ID</th>
            <th scope='col'>Status</th>
            
            
            
          </tr>
        </thead>
       <tbody className="tablebody">
       {paymentList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.fname.toLowerCase().includes(searchTerm.toLowerCase()) || val.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
                       || val.payment_status.toLowerCase().includes(searchTerm.toLowerCase()))
                       
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(  
              <tr>
              <th scope="row">{record.payment_id}</th>
              <td>{record.fname}</td>
              <td>{record.payment_method}</td>
              <td>{record.total_price}</td>
              <td>{record.advance_price}</td>
              <td>{record.order_id}</td>
              <td>{record.payment_status}</td>
            </tr>
           

           )
          })}
            
          
        </tbody> 
      </Table>
      </div>
    )
}