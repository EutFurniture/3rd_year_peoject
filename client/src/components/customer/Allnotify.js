import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
      noty: {
       width:"60%",
       height:"30%" ,
      fontSize:"20px",
      marginLeft:"22%",
      marginTop:"3%",
      fontWeight:'bold',
      },
      hello:{
            textAlign:"center",
            color:"blue",
            padding:'7px'
      },
      hellol:{
            textAlign:"center",
            color:"red",
            padding:'7px'
      },
      but:{
            background:'darkblue',
            marginLeft: '10px', 
           fontWeight:"bold",
            color:'white', 
            padding: '5px 10px', 
            borderRadius: '5px'
      },
      bord:{
            borderRadius:"10px",
            backgroundColor:"lightblue",
      },
      bordd:{
            borderRadius:"10px",
            backgroundColor:"pink",
      }


}));
const dateOnly = (d) => {
      const date = new Date(d);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year} - ${month} - ${day}`;
};

export default function Allnotify(userData) {
      const [cusorderCount, setCusOrderCount] = useState([])
      const [orderList, setorderList] = useState([])
      const [deliveryorder, setDeliveryorder] = useState([])
      const classes = useStyles();
      const { customer_id } = useParams();
      toast.configure()
      useEffect(() => {
            const fetchData = async () => {
                  axios.get("http://localhost:3001/customerNofication", {
                        params: {
                              customer_id: userData.userData.customer_id,
                        }
                  }).then((response) => {
                        setorderList(response.data)

                  })

                  axios.get("http://localhost:3001/customerNoficationRej", {
                        params: {
                              customer_id: userData.userData.customer_id,
                        }
                  }).then((response) => {
                        setCusOrderCount(response.data)

                  })

                  axios.get("http://localhost:3001/deliverydate", {
                        params: {
                              customer_id: userData.userData.customer_id,
                        }
                  }).then((response) => {
                        setDeliveryorder(response.data)

                  })
                 

            }

            fetchData();
      }, [customer_id]);


      const notify = () => {

            toast.info(customToast, { position: toast.POSITION.TOP_RIGHT, autoClose: false })


      }

      const customToast = (id) => {
            return (
                  <div>
                        Hello,
                        Your customized Order has confirmed.
                        Pay the advance payment for this product.
                        <button  className={classes.but} onClick={Cuspage()}>PAY</button>
                  </div>
            )
      }
      const Cuspage = (oid,cid,cuid) => {
            window.location.href = `/customer/notification/${oid}/${cid}/${cuid}`
      }

      return (
            <div className={classes.noty}>

                  {orderList.map((val, key) => {
                        return (
                              <div>
                                   
                                    <div border="primary" className={classes.bord} >
                                          <div className={classes.hello}>
                                    Hello,
                                    Your customized Order has been confirmed.
                                    Pay the advance payment for this product.
                                    <button  className={classes.but} 
                                          onClick={()=>Cuspage(val.order_id,val.customer_id,val.cus_product_id)}>
                                          PAY
                                    </button>
  </div>
                                            
                                    </div>
                                    <br></br><br></br>
                              </div>

                        )
                  })}

{cusorderCount.map((val, key) => {
                        return (
                              <div>
                                   
                                    <div border="primary"className={classes.bordd}  >
                                          <div className={classes.hellol}>
                                    Hello,
                                    your {val.product_name} order  has been  Rejected.
                                  
  </div>
                                            
                                    </div>
                                    <br></br><br></br>
                              </div>

                        )
                  })}

{deliveryorder.map((val, key) => {
                        return (
                              <div>
                                   
                                    <div border="primary"className={classes.bord}  >
                                          <div className={classes.hello}>
                                    Hello,
                                    your order (OrderId :-{val.order_id})  will be deliver on {val.order_last_date}.
                                  
  </div>
                                            
                                    </div>
                                    <br></br><br></br>
                              </div>

                        )
                  })}

            </div>
      )
}
