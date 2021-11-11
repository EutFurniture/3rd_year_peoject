import React, { useState, useEffect } from 'react';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../Footer'
import DeleteIcon from '@material-ui/icons/Delete';
import {apiurl} from '../../../../utils/common'
import Navbar from '../../blog/Navbar'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import lLink from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
    container2: {
        marginLeft: '75%',
        marginBottom: '15%',
        marginTop: "3%",
    },
    total: {
        
        fontWeight: 'bold',
        textAlign: 'center',
       backgroundColor:'lightgreen',
       width:'200px',
       height:'40px',
      paddingBottom:'5px',
       paddingTop:'5px',

      

    },
    btn_backgd:{
        padding:'8px 12px',
        background:'green',
        color:'white',
        borderRadius:'5px',
        fontSize:'20px',

    },
    btn_backgdd:{
        padding:'8px 10px',
        background:'green',
        color:'white',
        borderRadius:'5px',
        pointer:'cursor',
        fontSize:'20px',

    },
    cartpage:{
       boxShadow:'5px 3px 10px rgb(169,169,169)',
        width:'1400px',
        borderRadius:'20px',
        marginLeft:'50px',
        align:'center',
        marginTop:'20px',
        marginTop:'70px'
    },
    paybtn:{
        marginLeft:'10px',
        backgroundColor:'#1e90ff',
        width:'100px',
        height:'40px',
        border:'none',
        borderRadius:'10px',
        fontSize:'18px',
        fontWeight:'bold',
        color:'white',
        marginRight:'10px',
        marginTop:'5px'

    },
    clearbtn:{
        marginLeft:'92%',
        marginTop:'20px',
        fontSize:'16px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:'#dc143c',
        width:'100px',
        height:'40px',
        border:'none',
        borderRadius:'10px'

    }
    
    

}));
export default function Cart(userData) {
    const [cart, setCartdata] = useState([])
    const { customer_id } = useParams();
    const classes = useStyles();
    const [cartCount,setCartCount]=useState([]);
 const[order,setOrder]=useState([]);
    const id = userData.userData.customer_id

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apiurl +'/getcart', {
                params: {
                    customer_id: id
                }
            });

            setCartdata(response.data);
            const response2=await axios.get(apiurl +'/cartCount',{
                params:{
                  customer_id:id,
                }
              })
               
              setCartCount(response2.data[0].count)
                
               
        };

       
        fetchData();
    }, [customer_id]);
    
    const increaseQuantity = async (customer_id, product_id, price) => {
        const response3 = await axios.get(apiurl +'/qut', {
            params: {
                pid: product_id
            }
        })
        const quty = response3.data[0].cquty;
        const quty1 = response3.data[0].pquty;
        if (quty < quty1) {
            axios.get(apiurl +'/increasequantity', {
                params: {
                    cid: customer_id,
                    pid: product_id,
                    price: price,
                }
            }).then((response) => {
                window.location.reload();
            })
        }
        else {
            alert("Only " + quty1 + " " + response3.data[0].product_name + " in the stock.");
        }
    }

    const decreaseQuantity = async (product_id, price) => {
        
        const response4= await axios.get(apiurl +'/qut', {
            params: {
                pid: product_id
            }
        })
        const quty2 = response4.data[0].cquty
        console.log(quty2);
        if (quty2 > 1) {
            axios.get(apiurl +'/decreasequantity', {
                params: {
                    cid: id,
                    pid: product_id,
                    price: price
                }
            }).then((response) => {
                window.location.reload();

            })
        }
        else {
            removeItem( product_id)
        }
    }


    function removeItem( product_id) {

        axios.get(apiurl +'/removeitem', {
            params: {
                cid: id,
                pid: product_id,
            }
        }).then((response) => {
             window.location.reload();
        })
    }

    function clearCart() {

        axios.get(apiurl +'/clearcart', {
            params: {
                cid: id,

            }
        }).then((response) => {
            window.location.reload();
        })
    }
    
    var total = 0;
    var advance = 0;
    cart.map(function (a) { return total += a.price * a.quantity }, 0);
   
    cart.map(function (a) { return advance = total * 0.2 }, 0);

    var roundadvance=Math.round(advance);
    
    
    const insertorder = async (total) => {

        axios.get(apiurl +'/orderproduct', {
            params: {
                cid: id,
                total:total,
                advance:roundadvance,


            }
        }).then((response) => {
            window.location.reload();
        })

        const response1=await  axios.get(apiurl +'/ordergift_id', {
            params: {
                cid:id,
               
            }
        });
        const o_id=response1.data[0].order_id;
        setOrder(response1.data[0].order_id);
        console.log(order);
        cart.map(function(a){
            
            return axios.get(apiurl +'/insertorderproduct', {
                params: {
                    oid: o_id,
                    pid:a.product_id,
                    quty:a.quantity,
                    total:a.totalprice
                }
               
            });
        
        
        
        });    

        
        
        clearCart();

    }

    return ( 
        
  <Fragment>

<div className={classes.cartpage}> 
      {cartCount == 0 ? <EmptyCart /> :
        <Fragment>
            <div style={{display:'flex'}}>
            <div style={{marginLeft:'600px',paddingTop:'20px'}}>
                            <h3><b>MY ORDER LIST</b></h3>
                        </div>
                <div style={{marginLeft:'375px'}}>
                        <Link to='/customer/dining'>
                            <button id="cart-to" className={classes.clearbtn} type="button"
                                onClick={() => clearCart()} 
                            >
                                Clear Cart
                            </button>
                        </Link>
                        </div>
                        
                        </div>
            <CartColumns />

            <div className="container-fluid">
                {
                    cart.map(item => (
                        <div className="row my-2 text-capitalize text-center" key={item.cart_id}>
                            <div className="col-10 mx-auto col-lg-2">
                               <img src={`/${item.product_img}`} style={{ width: '5rem', height: '5rem' }}
                                    className="img-fluid" alt="product" />
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <span className="d-lg-none">product : </span>
                                <b>{item.product_name}</b>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <span className="d-lg-none">price : </span>
                               <b> Rs.{item.price.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</b>
                            </div>
                            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <span style={{cursor:'pointer'}} className={classes.btn_backgd} onClick={() => decreaseQuantity( item.product_id, item.price)}>
                                            -
                                        </span>
                                        <span className="btn btn-black mx-1">
                                            <b>{item.quantity}</b>
                                        </span>
                                        <span style={{cursor:'pointer'}} className={classes.btn_backgdd} onClick={() => increaseQuantity(item.customer_id, item.product_id, item.price)}>
                                            +
                                        </span>

                                    </div>
                                </div>
                            </div>
                           
                            <div className="col-10 mx-auto col-lg-2">
                                <div className="cart-icon" onClick={() => removeItem(item.product_id)} >
                                    <DeleteIcon style={{color:'#ffa500'}}/>
                                </div>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <strong>  Rs.{item.totalprice .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</strong>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className={classes.container2}>
                <div  style={{display:'flex'}}>
                    <div className="col-10 mt-2 ml-sm-3 ml-md-2 col-sm-8 text-capitalize text-right">
                        <h5 className={classes.total}>
                            <span >
                                Total:
                            </span>
                            <strong>Rs {total.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</strong>
                        </h5>
                       
                    </div>
                    <div>
                    <button id="cart-to" onClick={() => insertorder(total)} className={classes.paybtn}>
                    <Link to={location =>`/customer/checkout/${userData.userData.customer_id}`} className="payment" style={{textDecoration:'none' , color:'white'}}>Pay</Link> </button>
                    </div>
                </div>
            </div>
        
        </Fragment>
}
</div>
{/* <Link to={location =>`/customer/checkout/${userData.userData.customer_id}`} className="payment">Payhere</Link> */}

<Footer />
        </Fragment>  
      
       
    );
}







