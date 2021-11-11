import { Route, Switch } from "react-router-dom";
import UpdateConDelivery from './UpdateConDelivery'

const UpdateConDeliveryRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/dPerson/UpdateConDeliveryRoute/:order_id">
                    <UpdateConDelivery/>
                </Route>
            </Switch>
        </div>
    )
}

export default UpdateConDeliveryRoute;