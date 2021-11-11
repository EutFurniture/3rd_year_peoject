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
       fontWeight:'bold',
        marginTop: '15px',
        marginBottom: '12px',
       color:'white',
    },
   
    lab: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: '18px',
        marginTop: '3px'
    },
    cartpage: {
        boxShadow: '5px 3px 10px rgb(169,169,169)',
        width: '1000px',
        borderRadius: '20px',
        marginLeft: '339px',
        align: 'center',
        marginTop: '20%',
       backgroundColor:'white',
        marginBottom: "8.5%",
    },

    heading:{
        backgroundColor:'grey',
        width:'100%',
        marginBottom:'20px',
    }
}))
const labels = {

    1: 'Useless+',

    2: 'Poor+',

    3: 'Ok',

    4: 'Good',

    5: 'Excellent',
};

const Feedback = (userData) => {
    const classes = useStyles();
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHovervalue] = useState(undefined);
    const [discript, setDiscript] = useState("");
    const [Dt, setDt] = useState("");

    const handleClick = value => {
        setCurrentValue(value)
    };

    const handleMouseOver = value => {
        setHovervalue(value)
    }
    const handleMouseLeave = () => {
        setHovervalue(undefined)
    }

    const submit = () => {

        axios.get('http://localhost:3001/feedback', {

            params: {
                cid: userData.userData.customer_id,
                currentValue: currentValue,
                discript: discript,
            }
        }

        )

        alert("Thank you for your support.")
        window.location.reload();


    }
    return (
        <Fragment>
            <div className={classes.cartpage}style={styles.container
            } >
               <div className={classes.heading}> <h2 className={classes.hed}>Please rate for  your purchases</h2></div>
                <div styles={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                            <FaStar key={index}
                                size={30}
                                style={{
                                    marginRight: 30,
                                    cursor: "pointer"
                                }}

                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                            />

                        )
                    })}
                    {currentValue !== null && <Box ml={2}><p className={classes.lab}>{labels[hoverValue !== -1 ? hoverValue : currentValue]}</p></Box>}
                </div>
                <textarea placeholder="What is your feedback"
                    style={styles.textarea} className={classes.text} onChange={(event) => setDiscript(event.target.value)} />
                <button style={styles.button} onClick={() => submit()} >Submit</button>
            </div>
          
            <Footer />
        </Fragment>
    );
};
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25px"

    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: "40%",
        padding: "20px 10px",
        margin: "30px 0",
        minHeight: 100,
        color: "black",
        fontSize:'18px',
        fontWeight:'bold',

    },
    star: {
        marginTop: "30px"
    },

    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 200,
        padding: 10,
        marginBottom: "15px",
        backgroundColor:'#1e90ff',
        fontWeight:'bold',
 color:'white',
 fontSize:"17px"

    }
}

export default Feedback;