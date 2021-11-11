import React,{Fragment,useEffect,useState} from 'react';
import Footer from './Footer';
import './profile.css';
import Blog from './blog/Blog';
import Axios from 'axios';
import { useParams ,Link} from "react-router-dom";
export default function Profile(userData) {
  const [user,setUser]=useState([])
  const { customer_id } = useParams();
  
 
  useEffect(() => {
    const fetchData = async () => {
        const response = await Axios.get('http://localhost:3001/profile', {
            params: {
              customer_id:userData.userData.customer_id,
                
            }
        });
       
        setUser(response.data[0]);
       
         
    };
    fetchData();
  }, [customer_id]);
 
  
  
  // const handleInput =(e) =>{
  //   let reader =new FileReader();
  //   let file=e.target.files[0]
  //   reader.onloadend =() =>{
  //     setState({
  //       ...state,
  //       file:file,
  //       userImage:reader.result,
  //       message:""
  //     })
  //   }
    
  // }
    return (
     
      <Fragment>
       
      
       
        <div className="contain">
           <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="carddd">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                 
                    <img src={`/${user.proimg}`} alt="myprofile" class="rounded-circle" width="150" height="150" />
                    <div class="mt-3">
                      <h4>{user.fname} {user.lname}</h4>
                    
                      <h6>Points:{user.points}</h6>
                     
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            <div class="col-md-8">
              <div class="carddd mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9  text-secondary">
                    {user.fname}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {user.email}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {user.phone}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {user.address}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">NIC</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     {user.nic}
                    </div>
                  </div>
                  <hr/>
                  
                  
                  <div class="row">
                    <div class="col-sm-12">
                      <button class="btn btn-info " style={{marginRight:'50%'}} target="__blank">
                        <Link to={location=> `/customer/Updateprofile/${user.customer_id}`} className="edit">Edit</Link></button>
                    </div>
                  </div>
                </div>
              </div>

        </div>
    
    </div>   
    <Footer />
    </Fragment>
    )
}
