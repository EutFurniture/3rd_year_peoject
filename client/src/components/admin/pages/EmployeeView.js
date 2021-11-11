import "../css/manageEmployee.css";
import { Link, Switch } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router,  Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';


export default function EmployeeView() {
  const [searchTerm,setSearchTerm]=useState("");
  const [employeeList,setEmployeeList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/load").then((response)=>{
     setEmployeeList(response.data)
   })
 },[])

 const deleteEmployee =(id)=>{
  axios.delete(`http://localhost:3001/delete/${id}`);
}

const viewEmployee =(id)=>{
  console.log(id);
  axios.get(`http://localhost:3001/view/${id}`);
  if(id){
    window.location.href='/admin/pages/EmpInfo'
  }
}

const updateEmployeeDetails = (id) => {
  axios.put("http://localhost:3001/updateEmployee", {name: newName,  id: id}).then(
    (response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? {id: val.id, name: val.name} : val
      }))
   }
  );
};


 const [newName,setNewName]=useState("");

const updateEmployee =(id)=>{
  console.log(id);
  axios.put(`http://localhost:3001/update/${id}`);

 
};

const UpdateName=(id)=>{
  console.log(id)
  
  axios.put("http://localhost:3001/updateEmployee",{
    id:id,
    name:newName,
  });
  setNewName("")
}

const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  return(
 
              <div ><br/>
                <div className='box-main'>
                <div className="searchbar">
                <SearchIcon  className='searchicon1'/>
                   <input style={{width:'900px',borderColor:'white'}} type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search"/>
                 
                </div>
                <Link  to='/admin/pages/AddEmployeeForm' className="Addbtn"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
               
                </div><br/>
               
                <Table striped bordered hover responsive>
                  <thead className="tableheading">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody className="tablebody">
                     {employeeList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                     val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.email.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
                        <tr>
                        <th scope="row">{record.id}</th>
                        <td>{record.name}</td>
                        <td>{record.email}</td>
                        <td>{record.role}</td>
                        <td align="center">
                          {/* <Link  onClick={()=>{viewEmployee(record.id)}} onClick={toggleModal} className="btn1 btn-primary " >
                            View
                          </Link> */}
                           <Link to={location=> `/Employee/${record.id}`} className="viewbtn " >
                            View
                          </Link>
                          
                          <Link to={location=> `/EmpEdit/${record.id}`} className="updatebtn ">
                            Edit
                          </Link>
                          
                          {/* <Link onClick={()=>{deleteEmployee(record.id)}} className="deletebtn">
                            Delete
                          </Link> */}
                        </td>
                      </tr>
                       )

                     
                     })}
                             
                  </tbody> 
                </Table>  
              </div>
           
  )
}