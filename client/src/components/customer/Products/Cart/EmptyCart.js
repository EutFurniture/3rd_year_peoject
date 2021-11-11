import React from 'react'
import { Fragment } from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    container: {
       
        marginBottom: '13%',
        marginTop: "12%",
        fontWeight:'bold',
       
       
    },
    empty:{
        fontSize:"60px",
        fontWeight:'bold',
        color:"rgb(82, 76, 76)",
      textShadow:"0px 4px 10px grey",
      marginTop:'20px',  

    },
    shop:{
        backgroundColor:'#1e90ff',
        width:'20%',
        height:'40px',
        border:'none',
        borderRadius:'5px',
        fontSize:'15px',
        fontWeight:'bold',
        color:'white',
        marginBottom:'15px',
        '&:hover':{
            backgroundColor:'#1e90ff',
            color:'white',
        }
    }
  

}));
export default function EmptyCart() {
    const classes = useStyles();
    return (
        <Fragment>
       
        <div className={classes.container}>
            <div className="row">
              <div className="col-10 mx-auto text-center text-title">
                  <h1 className={classes.empty}>Your cart is currently empty</h1>
                  <Button href="/customer/dining" className={classes.shop}>CONTINUE SHOPPING <ArrowRightAltIcon />  </Button>
                  </div>  
            </div>
            
        </div>
        </Fragment>
    )
}
