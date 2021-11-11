
import {Link} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import '../css/popupmodel.css'
import React, { useState, useEffect } from "react";

import axios from "axios";
import "../css/manageEmployee.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';


export default function Categories() {

  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  
  const [searchTerm,setSearchTerm]=useState("");
  const [categoryList,setCategoryList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadCategory").then((response)=>{
     setCategoryList(response.data)
   })
 },[])

 
  


 

 
  
  

  // const [name,setName] = useState("");
  // const [date,setDate] = useState("");

  // const addCategory = ()=>{
  //   console.log(name);
  //    axios.post('http://localhost:3001/AddCategory',{
  //      name:name,
     
       
  
  //     }).then(()=>{
  //      alert('Category added successfully')
  //      window.location.href='/Categories'
  //      });
  // };


 

    return(
      <div ><br/>
                <div className='box-main'><br/><br/>
                <div className="searchbar">
                <SearchIcon  className='searchicon1'/>
                   <input style={{width:'900px',borderColor:'white'}} type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}} />
                  
                </div>
                <div>
                <Link className="Addbtn" to='/admin/pages/AddCategory'><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
                
               </div>
                </div><br/>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope='col'>Added Date</th>
            <th align="center">Action</th>
            
          </tr>
        </thead>
       <tbody className="tablebody">
       {categoryList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
              <tr>
              <th scope="row">{record.category_id}</th>
              <td>{record.name}</td>
              <td>{dateOnly(record.date)}</td>
              <td align="center">
                
                <Link to={location=> `/Category/${record.category_id}`} className="updatebtn" >  Edit </Link>
               
              
                  
              </td>
            </tr>
          )
        })}

             
          
        </tbody> 
      </Table>
     
      </div>
    )
}