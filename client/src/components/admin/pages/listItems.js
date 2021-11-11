import React from 'react';
import { Link } from 'react-router-dom'
//import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import StoreIcon from '@material-ui/icons/Store';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


export const mainListItems = (
  <div>
    <ListItem button  component={Link} to="/admin/pages/DashboardNew">
      <ListItemIcon style={{color:'white'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
      {/* <strong><h1 >Dashboard</h1></strong> */}
    </ListItem>
    <ListItem button component={Link} to="/admin/pages/ManageUser">
      <ListItemIcon style={{color:'white'}}>
      <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="View Customer" />
    </ListItem>
    <ListItem button component={Link} to="/CustomizeOrder">
      <ListItemIcon style={{color:'white'}} >
        <ShoppingCartIcon/>
      </ListItemIcon>
      <ListItemText primary="Customized Orders" />
    </ListItem>
    <ListItem button component={Link} to="/admin/pages/ManagePayments">
      <ListItemIcon style={{color:'white'}}>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Payment" />
    </ListItem>

    <ListItem button component={Link} to="/admin/pages/Categories">
      <ListItemIcon style={{color:'white'}}>
        <StorefrontIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>

    <ListItem button component={Link} to="/ManageProducts">
      <ListItemIcon style={{color:'white'}}>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Products" />
    </ListItem>
    <ListItem button component={Link} to="/ManageGifts">
      <ListItemIcon style={{color:'white'}}>
        <CardGiftcardIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Gifts" />
    </ListItem>
    <ListItem button component={Link} to="/admin/pages/ManageEmployee">
      <ListItemIcon style={{color:'white'}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Employees" />
    </ListItem>
   
    <ListItem button component={Link} to="/MovingItems">
      <ListItemIcon style={{color:'white'}}>
        <AssignmentReturnedIcon />
      </ListItemIcon>
      <ListItemText primary="Moving Items" />
    </ListItem>

    <ListItem  button component={Link} to="/ReportGeneration">
      <ListItemIcon style={{color:'white'}}>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Report Generation" />
    </ListItem>
  </div>
);



export const Logout = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <PowerSettingsNewIcon style= {{fontSize:40,color:"red"}}/>
      </ListItemIcon >
      <strong><h2>LOGOUT</h2></strong>
    </ListItem>
  </div>
)