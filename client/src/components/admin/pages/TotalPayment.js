import React from 'react'
import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import TotalPaymentSplit from './TotalPaymentSpilit';
import Payment from './Payment';
import {Table} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import "../css/manageEmployee.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
   

export default function TotalPayment(userData) {
    const { customer_id } = useParams();
    const [value, setValue] = React.useState(0);
    const [searchTerm,setSearchTerm]=useState("");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [user, setUser] = useState([])
    const [order, setOrder] = useState([])
    
    const [order1, setOrder1] = useState([])
    
    const dateOnly = (d) => {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year} - ${month} - ${day}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            Axios.get('http://localhost:3001/paymentorderlist1').then((response) => {
                setOrder(response.data);
            })


            

        };
        fetchData();
    });


    
  useEffect(()=>{
    Axios.get("http://localhost:3001/Advancepaymentorderlist").then((response)=>{
      setOrder1(response.data)
      
    })
  },[])

      

  
   


    return (
       
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Full Payment" {...a11yProps(0)} />
            <Tab label="Advanced Payment" {...a11yProps(1)} />
           
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <div className="searchbar">
                   <SearchIcon  className='searchicon1'/>
                   <input style={{width:'900px',borderColor:'white'}} type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search"/>
                
                    </div><br/><br/>
        <Table striped bordered hover responsive>
                    <thead className="tableheading" >
                        <tr>
                            <th>Order ID</th>
                            <th>Payment Method</th>
                            <th>Payment Date</th>
                            <th >
                          Amount

                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className="tablebody">
                        <Fragment>
                            {order.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                      val.payment_method.toLowerCase().includes(searchTerm.toLowerCase()))
                       
                     {
                       return val
                     }
                    }).map(item =>
                                <tr >
                                    <td>{item.order_id}</td>
                                    <td>{item.payment_method}</td>
                                    <td>{dateOnly(item.order_last_date)}</td>
                                    <td>{item.total}</td>
                                    

                                </tr>
                            )}
                        </Fragment>


                    </tbody>
                </Table> 

         
        </TabPanel>
        <TabPanel value={value} index={1}>
        <div className="searchbar">
        <SearchIcon  className='searchicon1'/>
                   <input style={{width:'900px',borderColor:'white'}} type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search"/>
                
                    </div><br/><br/>
                    <Table striped bordered hover responsive>
                    <thead className="tableheading" >
                        <tr>
                            <th>Order ID</th>
                            <th>Payment Method</th>
                            <th>Payment Date</th>
                            <th >
                          Amount

                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className="tablebody">
                        <Fragment>
                            {order1.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                        val.payment_method.toLowerCase().includes(searchTerm.toLowerCase()))
                       
                     {
                       return val
                     }
                    }).map(item =>
                                <tr >
                                    <td>{item.order_id}</td>
                                    <td>{item.payment_method}</td>
                                    <td>{dateOnly(item.order_last_date)}</td>
                                    <td>{item.total}</td>
                                    

                                </tr>
                            )}
                        </Fragment>


                    </tbody>
                </Table> 
         
        </TabPanel>
        
        
      </Box>
    );
  }
