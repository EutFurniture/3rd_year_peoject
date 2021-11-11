import React, { useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles} from '@material-ui/core/styles';


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
            backgroundColor: 'white',
            color: 'black',

            padding: "1%",

      },
      toolbarTitle: {
            flexGrow: 1,
            fontWeight:'bold',
            fontSize:'30px',
            textShadow:"5px 3px 10px rgb(169,169,169)", 
      },
      link: {

            margin: theme.spacing(1, 1.5),
            fontWeight: 'bold',
            flexShrink: 0,
            textAlign:'center',
            fontSize:'20px',
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
      login:{
        textDecoration:'none',
        '&:focus':{
         textDecoration:'none',
         
        },
        '&:hover':{ 
         textDecoration:'none',
        }
      },
      logbut:{
        fontWeight:'bold',
        backgroundColor:'black',
        color:'white',
        padding:'5px',
        paddingLeft:'10px',
        paddingRight:'10px',
        fontSize:'16px',
        '&:focus':{
          backgroundColor:'black',
          color:'white',
          textDecoration:'none'
          
         },
         '&:hover':{ 
          backgroundColor:'black',
        color:'white',
        textDecoration:'none',
         }
      },
      heroContent: {
            padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
            backgroundColor:
                  theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
     ass:{
           textDecoration:"none",
           color:"white",
           '&:hover':{
                 textDecoration:"none",
                 color:"white",
           }
     },
     navalign:{
           align:'center',
           textAlign:'center',
           marginRight:'420px'
     }

}));





export default function Navbar(userData) {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = useState(null);
      
      const [open, setOpen] = useState(false);
     


      
      return (
            <React.Fragment>
                  <CssBaseline />
                  <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                              <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
                                    EUT FURNITURE
                              </Typography>
                              <nav style={{display:'flex'}}>
                                    <div className={classes.navalign}>
                                    <Link variant="body2" noWrap color="inherit" href="/" className={classes.link}>
                                          Home
                                    </Link>
                                    <Link variant="body2" noWrap color="inherit" href="/aboutl" className={classes.link}>
                                          About
                                    </Link>
                                    <Link variant="body2" noWrap color="inherit" href="/dining" className={classes.link}>
                                          Product
                                    </Link>
                                    
                                    </div>
                                    <div>
                                   

                                  </div>
                                   
                                  <Button className={classes.logbut} size="small"><Link color="inherit" className={classes.login} href='/signin' >
         LogIn
          </Link>
        </Button>
                              </nav>
                         
        
                        </Toolbar>
                  </AppBar >



            </React.Fragment >
      );
}



  
    
