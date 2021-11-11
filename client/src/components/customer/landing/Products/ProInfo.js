import React, {useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Blog from '../Blog'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    btnn: {
      backgroundColor:"blue",
      color:"white",
      fontWeight:"bold",
      '&:hover':{
         backgroundColor:"blue",
         color:"white",
      }
 
     },}));
export default function ProInfo (){
    const classes = useStyles();
    const [product, setproduct] = useState([])
    const{id}=useParams()
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/Allproduct', {
                params:{id:id}
                
            });
            console.log(id);
            setproduct(response.data[0]);

        };
        fetchData();
    }, [id]);


    const propath =(catid)=>{
        if(catid == 1){
            window.location.href='/dining';
        }
        else if(catid == 2){
            window.location.href='/table';
        }
        else if(catid == 3){
            window.location.href='/chair';
        }
        else if(catid == 4){
            window.location.href='/sofa';
        }
        else if(catid == 5){
            window.location.href='/bed';
        }
        else if(catid == 8){
            window.location.href='/';
        }


    }
        return(
            <React.Fragment>
              
               <Blog />
                      <div className="container py-5">
                    
                      <div className="row">
                          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <img src={`/${product.product_img}`} className="img-fluid" width="300" height="300" alt="product"/>
                          </div>
                          {/* Product text */}
                          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                          <h4 className="ttile"><strong style={{color:'darkblue'}}>MODEL : {product.product_name}</strong></h4> 
                                {/* <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    made by: <span className="text-uppercase">
                                    {company}
                                    </span>
                                    
                                </h4> */}

                          <h4 className="text-blue">
                                    <strong style={{color:'darkgreen'}}>
                                       PRICE : <span> Rs.</span>
                                        {product.price}.00
                                    </strong>
                                </h4>
                                <h5 className="text-capitalize font-weight-bold mt-3 mb-0">
                                   <strong> some info about the product:</strong>
                                </h5>
                                <p className="text-muted lead">
                               {product.description}
                                </p>
                                {/* buttons */}
                                <div>
                                    
                                <Button color="primary" variant="outlined" className={classes.btnn} onClick={()=>propath(product.category_id)}>
                                            back to products
                                        </Button>
                                    
                                    {/* <ButtonContainer
                                    cart
                                    disabled={inCart?true:false}
                                    onClick={() => {
                                      value.addToCart(id);
                                      value.openModal(id);
                                    }}
                                    >
                                        {inCart? 'inCart':'add to cart'}
                                    </ButtonContainer> */}
                                </div>
                          </div>
                      </div>
                      </div>
                  
              
           
            </React.Fragment>
        );
    }
