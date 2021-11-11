import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';
//import styled from 'styled-components';
import '../../Products/category/productstyle.css'
import axios from 'axios';
import Pproduct from "../Pproduct";
import Footer from '../../Footer'
import Blog from '../Blog'
import {apiurl} from '../../../../utils/common'
export default function ProductList(userData) {

    const [product, setDt] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apiurl +'/table', {

            });

            setDt(response.data);

        };
        fetchData();
    }, []);


    return (
        <React.Fragment>
            <Blog />
            <Pproduct />

            <div className="py-5">
                <Title name="Tables" />
                <div className="container">


                    <div className="row">

                        {
                            product.map(item => (

                                <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                    <div className="card" key={item.product_id}>




                                        <div className="img-container p-5">

                                            <Link to={location => `/detaill/${item.product_id}`}>
                                                <img src={`/${item.product_img}`} alt="proudct" className="card-img-top" />
                                            </Link>


                                        </div>

                                        <div className="card_body">
                                            <h2>{item.product_name}</h2>
                                            <div className="price">
                                                <span>{item.currency}</span>
                                                <h6>{item.price.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</h6>
                                            </div>
                                            <hr className="new" />
                                            <div className="cta_group">
                                                {item.quantity > 0 ?
                                                    <div>
                                                        <Link className="button-atc" to="/signin"

                                                        >Order Now</Link>

                                                    </div> :
                                                    <p className="text"> product is out of stock </p>
                                                }

                                            </div>
                                        </div>

                                        {/*                                         
                                        <div className="card-footer  ">
                                            <p className="align-self-center mb-0 font-weight-bold">
                                                {item.product_name}
                                            </p>
                                            <h5 className="text-blue font-italic  mb-0">
                                                <span className="mr-1">Rs.</span>
                                                {item.price}
                                            </h5>
                                          
                                        </div>
                                        { item.quantity > 0 ?
                                        <div>
                                            <button className="button-atc"onClick={() => {
                                      addToCart(item.product_id,item.price)}}>Add to cart</button>
                                         
                                        </div> : 
                                        <p className="text-danger"> product is out of stock </p>
                                     } */}

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

// const ProductWrapper = styled.div`

//             .card{
//                 width:100%;
//                 height:95%;
//                 position: relative;
//                 border-radius: 10px;
               
                
               
// }

// &:hover{
//     .card{
//         background-color:rgb(119, 124, 126);
       
//     }
//     .new{
//         border:1px solid white;
//     } 
//     .button-atc
//    {
//     color:white;

//    }
//    .text{
//     color:red;
//    }
// }

          
      
           
  
// }
//             .img-container{
//                 position:relative;
//             overflow: hidden;
//             height:60%;
// }
//             .card-img-top{
//                 transition: all 1s linear;
               
// }
//             .img-container:hover .card-img-top{
//                 transform: scale(1.2);
               
// }
         
// .card_body{
//     padding:0 5px;
//     width:100%;
//     height:65%;
    
// }
// .card_body h2{
    
//         text-align: center;
//         font-weight: bold;
//         text-transform: uppercase;
//         margin:10px 0;
//         font-size: 17px;
//         color: black;
        
        
//     }
//     .card_body p{
//         text-align: center;
//         font-size: 13px;
//         line-height: 1.5;
//         margin-bottom: 10px;
//     }

// .price_section{
//     justify-content: space-between;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }
// .price{
//     display: flex;
//     text-align:center;
//     justify-content: center;
//     align-items: center;
//     color:rgb(190, 17, 17);
//     font-size: 15px;
//     }
// .price span{
//         margin-right: 6px;
//         display:grid;
//         font-size: 18px;
//         font-weight:bold;
//     }

//     .price h6{
//         margin-top: 8px;
//        font-weight:bold;
        
//     }
//     .cta-group{
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//             .button-atc{
//             position:absolute;
//             color: rgb(32, 119, 219);
//             text-transform: uppercase;
//             font-weight: bold;
//             font-size: 16px;
//             transition: all .3s ease-in-out;
//            margin-left:28%;
//            text-decoration:none;
//            text-align:center;
//            text-shadow:0px 4px 10px grey;   
// }

           
//             .img-container:hover .cart-btn{
//                 transform: translate(0, 0);
// }
// .text{
//     text-align:center;
//     font-weight:bold;
//    font-size:20px;
//    color:red;

// }
// .new{
//     border:1px solid grey;
//     margin-top:8%;
// }
// .new:hover{
//     border:1px solid white;
// }      
//             `;
