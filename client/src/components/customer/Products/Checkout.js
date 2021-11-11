import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Blog from '../blog/Blog'
import Grid from '@material-ui/core/Grid';
import Axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useParams } from "react-router-dom";
import { PayHereButton } from 'react-payhere-button'
import {apiurl} from '../../../utils/common'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
    marginLeft:'20px'
  },

  total1: {
    fontWeight: 700,
    marginLeft:'20px'
  },

  total2: {
    fontWeight: 700,
    marginLeft:'20px'
  },

  total3: {
    fontWeight: 700,
    marginLeft:'20px'
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '20px',
  },
  order: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  hhr: {
    border: '1px solid black',
  },
  head: {
    fontWeight: 'bold',
    fontSize: '35px',
  }
}));

export default function Checkout(userData) {
  const classes = useStyles();
  const [products, setproducts] = useState([])
  const [order, setorder] = useState([])
  
  const { customer_id } = useParams();
  const [user, setUser] = useState([])
  const [activeStep, setActiveStep] = React.useState('');
  const handleNext = () => {
    setActiveStep("full");
  };

  const handleBack = () => {
    setActiveStep('advance');
  };

  useEffect(() => {
    const fetchData = async () => {

      const response = await Axios.get(apiurl +'/ordergift_id', {
        params: {
          cid: userData.userData.customer_id,

        }
      });
      const o_id = response.data[0].order_id;
      setorder(response.data[0])

      const response1 = await Axios.get(apiurl +'/getorderproduct', {
        params: {
          oid: o_id,

        }
      });
      setproducts(response1.data);
      console.log(response1.data);
      const response2 = await Axios.get(apiurl +'/profile', {
        params: {
          customer_id: userData.userData.customer_id,

        }
      });

      setUser(response2.data[0]);



    };
    fetchData();
  }, [customer_id]);
  
  var total = 0;
  var advance = 0;

  products.map(function (a) { return total += a.price * a.quantity }, 0);
 
  products.map(function (a) { return advance = total * 0.2 }, 0);
  var roundadvance = Math.round(advance);
  const onSucess = async () => {
    const response = await Axios.get(apiurl +'/ordergift_id', {
      params: {
        cid: userData.userData.customer_id,

      }
    });
    const o_id = response.data[0].order_id;
    const total = response.data[0].total_price;
    const custpoint = Math.round(total * 0.05);
    Axios.get(apiurl +'/insertpayment', {
      params: {
        oid: o_id,

      }
    });
    const response2 = await Axios.get(apiurl +'/increasepoint', {
      params: {
        cid: userData.userData.customer_id,
        price: custpoint,
      }
    })

    products.map(function (a) {

      return Axios.get(apiurl +'/inventorybalance', {
        params: {
          oid: o_id,
          pid: a.product_id,
          quty: a.quantity,

        }

      });
    });


  }
  
  const OnfullSuccess = async () => {
    Axios.get(apiurl +'/insertfullpayment', {
      params: {
        oid: order.order_id,

      }
    });
    const custpoint = Math.round(total * 0.05);
    const response2 = await Axios.get('http://localhost:3001/increasepoint', {
      params: {
        cid: userData.userData.customer_id,
        price: custpoint,
      }
    });

    products.map(function (a) {

      return Axios.get('http://localhost:3001/inventorybalance', {
        params: {
          oid:order.order_id,
          pid: a.product_id,
          quty: a.quantity,

        }

      });
    });


  }
  const OnDismissed = () => alert('onDismissed');
  const onDismissed = () => alert('onDismissed');
  return (
    <React.Fragment>

      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>

      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.head} align="center">
            Checkout
          </Typography>


          <Typography className={classes.order}>
            Order summary
          </Typography>
          <List disablePadding>
            {products.map((product) => (
              <ListItem className={classes.listItem} key={product.product_id}>
                <ListItemText primary={product.product_name} secondary={product.quantity} />
                <Typography variant="body2">Rs.{product.total}.00</Typography>

              </ListItem>

            ))}
            <hr className={classes.hhr} />
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total Amount" />
              <Typography variant="subtitle1" className={classes.total}>
                Rs. {total .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00
              </Typography>
            </ListItem>
            
           
            
          </List>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.title}>
                Shipping
              </Typography>

              <Typography gutterBottom>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Name :-" />
                  <Typography variant="subtitle1" className={classes.total1} >
                    {user.fname}
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Address :-" />
                  <Typography variant="subtitle1" className={classes.total}>
                    {user.address}
                  </Typography>
                </ListItem>
              
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Phone no :-" />
                  <Typography variant="subtitle1" className={classes.total3}>
                    {user.phone}
                  </Typography>
                </ListItem>

              </Typography>


            </Grid>

          </Grid>

         


            <br></br>

            <p style={{fontSize:'20px',fontWeight:'700'}}>Select your payment method</p>
            <span><input checked type="radio" value="Advance" name="method" onClick={handleBack} />Advance Payment</span><br />
            <span> <input type="radio" value="Full" name="method" onClick={handleNext} />Full payment</span><br />
            
            <br></br>
            {activeStep === 'full' ?
              <Fragment>
                <p> Now you need to pay full amount Rs.{total .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</p>
                <div className={classes.buttons}>

                  <PayHereButton
                    sandbox={true}
                    merchant_id={'1218334'}
                    onCompleted={OnfullSuccess}
                    onDismissed={OnDismissed}
                    //onError={onError}
                    order_id={order.order_id}
                    // items={custproduct.product_name}
                    amount={total}

                    currency={'LKR'}
                    full_name={user.fname}
                    email={user.email}
                    phone={user.phone}
                    address={user.address}
                    city={user.city}
                    country={'Sri Lanka'}
                    options={{
                      delivery_address: 'No. 123, Galle road, Colombo 03',
                      delivery_city: 'Kollupitiya',
                      delivery_country: 'Sri Lanka',
                      custom_1: '',
                      custom_2: '',
                      return_url: 'http://sample.com/return',
                      cancel_url: 'http://sample.com/cancel',
                      notify_url: 'http://sample.com/notify',
                    }}
                  />

                </div>
              </Fragment> :
              <Fragment>
                <p> Now you need to pay advance amount Rs.{advance .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</p>
                <div className={classes.buttons}>



                  <PayHereButton
                    sandbox={true}
                    merchant_id={'1218334'}
                    onCompleted={onSucess}
                    onDismissed={onDismissed}
                    // onError={onError}
                    order_id={order.order_id}
                    items={products.map(product => product.product_name)}
                    amount={advance}
                    currency={'LKR'}
                    full_name={user.fname}
                    email={user.email}
                    phone={user.phone}
                    address={user.address}
                    city={user.city}
                    country={'Sri Lanka'}
                    options={{
                      delivery_address: 'No. 123, Galle road, Colombo 03',
                      delivery_city: 'Kollupitiya',
                      delivery_country: 'Sri Lanka',
                      custom_1: '',
                      custom_2: '',
                      return_url: 'http://sample.com/return',
                      cancel_url: 'http://sample.com/cancel',
                      notify_url: 'http://sample.com/notify',
                    }}
                  />

                </div>
              </Fragment>
            }







       



        </Paper>

      </main>
    </React.Fragment>
  );
}
