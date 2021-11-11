import React from 'react';
import { Link } from 'react-router-dom'
//import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import UndoIcon from '@material-ui/icons/Undo';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
//import { Redirect } from "react-router-dom";
import WeekendIcon from '@material-ui/icons/Weekend';

export const mainListItems = (
  <div>
    {/* <ListItem >
      <ListItemIcon style={{color:'white'}}>
        <WeekendIcon/>
      </ListItemIcon >
      <ListItemText primary="EUT FURNITURE"/>
    </ListItem>
     <hr style={{height: '5px', borderBlockColor:'white'}}/>  */}
    <ListItem button component={Link} to="/dManager/pages/Dashboard">
      <ListItemIcon style={{color:'white'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManageDelivery">
      <ListItemIcon style={{color:'white'}}>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Delivery" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/AssignDelivers">
      <ListItemIcon style={{color:'white'}}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Assign Delivers" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManagePrioritize">
      <ListItemIcon style={{color:'white'}}>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText primary="Prioritize Orders" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManageCashOnDelivery">
      <ListItemIcon style={{color:'white'}}>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Cash On Delivery" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManageReturnItems">
      <ListItemIcon style={{color:'white'}}>
        <UndoIcon />
      </ListItemIcon>
      <ListItemText primary="Return Items" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManageSchedule">
      <ListItemIcon style={{color:'white'}}>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Delivery Schedule" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManageDelivers">
      <ListItemIcon style={{color:'white'}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Delivers" />
    </ListItem>
    <ListItem button component={Link} to="/dManager/pages/ManageReports">
      <ListItemIcon style={{color:'white'}}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Generate Reports" />
    </ListItem>
  </div>
);

export const Profile = (
  <div>
    <ListItem button component={Link} to="/dManager/pages/ManageProfile">
      <ListItemIcon style={{color:'white'}}>
        <EditIcon/>
      </ListItemIcon >
      <ListItemText primary="Edit Profile"/>
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

export const Logout = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <PowerSettingsNewIcon style= {{fontSize:40, color:"white"}}/>
      </ListItemIcon >
      <strong><h2 >LOGOUT</h2></strong>
    </ListItem>
  </div>
);