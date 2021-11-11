import React, {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';
//import styled from 'styled-components';
import axios from 'axios';
import Pproduct from "../Pproduct";
import Footer from '../../Footer'
import Blog from '../Blog'
import {apiurl} from '../../../../utils/common'
import '../../Products/category/productstyle.css'
export default function ProductList(userData) {
    const [product, setDt] = useState([])
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apiurl +'/sofa', {

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
                <Title name="Sofa" title="Sets" />
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
                                            <hr  className="new" />
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

