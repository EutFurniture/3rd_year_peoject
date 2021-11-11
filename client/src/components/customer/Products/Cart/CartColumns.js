import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  
    ordersummary: {
      fontWeight:'bold',
      marginTop:'20px',
       fontSize:'16px',
       color:'darkblue',
      textTransform:'uppercase',
    },
   
}))

export default function CartColumns() {
    const classes = useStyles();
    return (
        <div className="container-fluid text-center d-none d-lg-block  mt-5">
            <div className="row">
              <div className="col-10.mx-auto col-lg-2">
                  <p className={classes.ordersummary}>products</p>
              </div>
              <div className="col-10.mx-auto col-lg-2">
                  <p className={classes.ordersummary}>name of products</p>
              </div>
              <div className="col-10.mx-auto col-lg-2">
                  <p className={classes.ordersummary}>price</p>
              </div>
              <div className="col-10.mx-auto col-lg-2">
                  <p className={classes.ordersummary}>Quantity</p>
              </div>
              <div className="col-10.mx-auto col-lg-2">
                  <p className={classes.ordersummary}>remove</p>
              </div>
              <div className="col-10.mx-auto col-lg-2">
                  <p className={classes.ordersummary}> Item total</p>
              </div>
            </div>
            
        </div>
    )
}
