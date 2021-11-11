import React from 'react';
import { Link } from 'react-router-dom'
//import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
//import PersonIcon from '@mui/icons-material/Person';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
//import LocalShippingIcon from '@material-ui/icons/LocalShipping';
//import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
//import UndoIcon from '@material-ui/icons/Undo';
//import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

//import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend'


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/sManager/pages/Dashboard">
      <ListItemIcon style={{color:'white'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/sManager/pages/ManageOrders">
      <ListItemIcon style={{color:'white'}}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>

    <ListItem button component={Link} to="/sManager/pages/payments">
      <ListItemIcon style={{color:'white'}}>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>

    <ListItem button component={Link} to="/sManager/pages/ManageCustom">
      <ListItemIcon style={{color:'white'}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>

    <ListItem button component={Link} to="/sManager/pages/promotions">
      <ListItemIcon style={{color:'white'}}>
        <ShopIcon />
      </ListItemIcon>
      <ListItemText primary="Promotions" />
    </ListItem>

    {/* <ListItem button component={Link} to="/sManager/pages/GenerateReport">
      <ListItemIcon style={{color:'white'}}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem> */}

    <ListItem button component={Link} to="/sManager/pages/ManageReports1">
      <ListItemIcon style={{color:'white'}}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    

    
    

    
    
  </div>
);

export const Profile = (
  <div>
    <ListItem button component={Link} to="/sManager/pages/Sales_ViewProfile">
      <ListItemIcon style={{color:'white'}}>
        <PersonIcon/>
      </ListItemIcon >
      <ListItemText primary="Edit Profile"/>
    </ListItem>
  </div>
 
);

export const Logout = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <PowerSettingsNewIcon style= {{color:"red"}}/>
      </ListItemIcon >
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);

export const Logo = (
  <div>
    <ListItem >
      <ListItemIcon style={{color:'white'}}>
        <WeekendIcon/>
      </ListItemIcon >
      <ListItemText primary="EUT FURNITURE"/>
    </ListItem>
  </div>
);

