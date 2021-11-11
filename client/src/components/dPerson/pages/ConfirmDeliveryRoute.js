import {Route, Switch} from "react-router-dom";

import ConfirmDelivery from './ConfirmDelivery'

const ConfirmDeliveryRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/dPerson/ConfirmDeliveryRoute/:employee_id">
                    <ConfirmDelivery/>
                </Route>
            </Switch>
        </div>
    )
}

export default ConfirmDeliveryRoute;