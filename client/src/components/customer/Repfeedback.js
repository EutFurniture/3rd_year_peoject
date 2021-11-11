import React, { useState, useEffect } from "react";
import { FaBlackberry, FaStar } from 'react-icons/fa'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from "react";
import Footer from "./Footer";
import Blog from './blog/Blog';
import axios from "axios";
import { useParams } from "react-router-dom";
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9"
}

const useStyles = makeStyles((theme) => ({
    hed: {

        textAlign: "center",
        color: 'white',
    },
    first: {
        justifyContent:'center',
        alignItems:'center',
        height:"100%",
        width: "50%",
        backgroundColor: "rgb(103, 103, 104)",
        alignItems: "center",
        marginLeft: "25%",
        marginTop: "70px",
        marginBottom: "10%",
    },
    stars:{
      
          color:"white",
          
    }
}))


const Repfeedback = (userData) => {
    const classes = useStyles();
    const stars = Array(5).fill(0);
    
    const [Dt, setDt] = useState("");

    


    

    return (
        <Fragment>

            <div  className={classes.first}>
                
                <div className={classes.stars}>
                   Thank you for your Support!
                  
                </div>
                
            </div>
<Footer />
        </Fragment>
    );
};


export default Repfeedback;