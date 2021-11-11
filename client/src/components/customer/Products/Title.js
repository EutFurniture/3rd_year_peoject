import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  
    name: {
     color: 'rgb(13, 23, 110)', // keep right padding when drawer closed
    },
}));
export default function Title({name,title}) {
    const classes = useStyles();
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center ">
                <h1 className=" font-weight-bold font-size-10px">
                   <strong className={classes.name}> {name} {title}
                    </strong>
                </h1>
            </div>
            
        </div>
    )
}
