import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
//import styled from 'styled-components';
import './productstyle.css'
import axios from 'axios';
import { useParams } from "react-router-dom";
import Footer from '../../Footer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import lLink from '@material-ui/core/Link'

export default function Gift(userData) {
    const { customer_id } = useParams();

    const [product, setDt] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/gift', {

            });

            setDt(response.data);

        };
        fetchData();
    }, []);

    const orderToCart = async(id, price) => {
        const custid = userData.userData.customer_id;
        const email = userData.userData.email;
        console.log(custid)
        console.log(id)
        const response1 = await axios.get('http://localhost:3001/customer', {
            params: {
                  email: email,
                  
              }
      });

    const  custpoint=response1.data[0].points;
    toast.configure()
    const notify = () => {

        toast.info(customToast, { position: toast.POSITION.TOP_CENTER, autoClose: true })


  }

  const customToast = () => {
        return (
              <div>
                    Hello,
                    your points not enough to get this gift.
                    
              </div>
        )
  }
  const notify2 = () => {

    toast.info(customToast2, { position: toast.POSITION.TOP_CENTER, autoClose: true })


}

const customToast2 = () => {
    return (
          <div>
                
                Successfully ordered.
                
          </div>
    )
}
      console.log(response1.data[0].points)
     if(custpoint >= price)
     {
      axios.get('http://localhost:3001/ordergift', {
            params: {
                cid: custid,
                price:price,
            }
        });
      const response3=await  axios.get('http://localhost:3001/ordergift_id', {
            params: {
                cid: custid,
               
            }
        });
        const o_id=response3.data[0].order_id;

        axios.get('http://localhost:3001/insertordergift', {
            params: {
                oid: o_id,
                pid:id,
                cid: custid,
                price:price,
            }
           
        });
        axios.get('http://localhost:3001/decreasepoint', {
            params: {
                cid: custid,
                price:price,
            }
           
        });

        axios.get('http://localhost:3001/insertgiftpayment', {
            params: {
              oid:o_id ,
      
            }
          })
          axios.get('http://localhost:3001/inventorygiftbalance', {
            params: {
              pid:id,
           
    
            }
    
          });

          
        notify2();
      

     }else{
          notify();
     }
      
    }

    return (
        <React.Fragment>
           

            <div className="py-5">
                <Title name="Select Your" title="Gift" />
                <div className="container">


                    <div className="row">

                        {
                            product.map(item => (

                                <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                    <div className="card" key={item.product_id}>




                                        <div className="img-container p-5">

                                            <Link to={location => `/customer/detail/${item.product_id}`}>
                                                <img src={`/${item.product_img}`} alt="proudct" width='100' height='150' className="card-img-top" />
                                            </Link>


                                        </div>

                                        <div className="card_body">
                                            <h2>{item.product_name}</h2>
                                            <div className="price">
                                                <span>Points</span>
                                                <h6>{item.price.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h6>
                                            </div>
                                            <hr  className="new" />
                                            <div className="cta_group">
                                                {item.quantity > 0 ?
                                                    <div>
                                                        <lLink style={{cursor:'pointer'}} className="button-atcc" onClick={() => {
                                                            orderToCart(item.product_id, item.price)
                                                        }}>Order</lLink>

                                                    </div> :
                                                    <p className="text"> product is out of stock </p>
                                                }
                                                <br></br><br></br>

                                            </div>
                                        </div>

                                       

                                    </div>

                                </div>

                            )

                            )



                        }


                    </div>
                </div>
            </div>
<Footer />
        </React.Fragment>
        // <Product />

    )
}

