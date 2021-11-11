import "../css/manageEmployee.css";
import SearchIcon from '@material-ui/icons/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoadOrder() {
  const [searchTerm,setSearchTerm]=useState("");
  const [orderList,setOrderList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadCustomizedOrder").then((response)=>{
     setOrderList(response.data)
   })
 },[])
    return(
      <div>
                <br/>
                   <div className="searchbar">
                   <SearchIcon  className='searchicon1'/>
                   <input style={{width:'900px',borderColor:'white'}} type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search"/>
                
                    </div><br/><br/>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope='col'>Customer Name</th>
            <th scope='col'>Design</th>
            <th scope='col'>Material</th>
            <th scope='col'>Color</th>
            
            
            
          </tr>
        </thead>
       <tbody className="tablebody">
       {orderList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || val.fname.toLowerCase().includes(searchTerm.toLowerCase()))
                       
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
              <tr>
              <th scope="row">{record.cus_product_id}</th>
              <td>{record.product_name}</td>
              <td>{record.fname}</td>
              <td><img src={`/${record.design}`} className='image' alt='/No Image'/></td>
              <td>{record.material}</td>
              <td>{record.color}</td>
             
              
            </tr>
            )
          })}
          
          
        </tbody> 
      </Table>
      </div>
    )
}