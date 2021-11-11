import {Route, Switch} from "react-router-dom";
import AvailableDeliveryInfo from './AvailableDeliveryInfo'
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"; 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eut Furniture
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AvailableDeliveryInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/dPerson/AvailableDeliveryInfoRoute/:order_id">
                    <AvailableDeliveryInfo/>
                </Route>
            </Switch>
            <Copyright/>
        </div>

       
    )
}
export default AvailableDeliveryInfoRoute;