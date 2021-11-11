import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
      '@global': {
            ul: {
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
            },
      },
      appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
         
            color:'black',  
           
      },
      toolbarTitle: {
            flexGrow: 1,
            fontWeight: 'bold',
      },
      link: {

            margin: theme.spacing(1, 1.5),
            fontWeight: 'bold',
            flexShrink: 0,
            padding: theme.spacing(1),
            textDecoration: 'none',
            '&:focus': {
                  backgroundColor: 'black',
                  color: 'white',
                  textDecoration: 'none',
            },
            '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                  textDecoration: 'none',
            }

      },
      heroContent: {
            padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
            backgroundColor:
                  theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
      cardPricing: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            marginBottom: theme.spacing(2),
      },

}));



export default function Pricing(userData) {
      const classes = useStyles();
      const [cartCount,setCartCount]=useState([]);
      const response1= axios.get("http://localhost:3001/cartCount",{
      params:{
        customer_id:userData.userData.customer_id,
      }
    }).then((response)=>{
      setCartCount(response.data)
     
      
    });
    const cardcount=cartCount.map(record=>record.count);

      return (
            <React.Fragment>
                  <CssBaseline />
                  <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                              <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>

                              </Typography>
                              <nav>
                              <Link
            color="inherit"
            noWrap
            variant="body2"
            href='/customer/cart'
            className={classes.toolbarLink}
          >
          <Badge badgeContent={cardcount} color="secondary">
           <AddShoppingCart />
           </Badge>
          </Link>

                                    

                                    <IconButton  color="inherit">
                                          <Badge badgeContent color="secondary">
                                                <NotificationsIcon />
                                          </Badge>
                                    </IconButton>
                              </nav>

                        </Toolbar>
                  </AppBar>



            </React.Fragment>
      );
}