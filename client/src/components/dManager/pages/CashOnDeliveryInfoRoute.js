import {Route, Switch} from "react-router-dom";

import CashOnDeliveryInfo from './CashOnDeliveryInfo'

const CashOnDeliveryInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/CashOnDeliveryInfoRoute/:order_id">
                    <CashOnDeliveryInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default CashOnDeliveryInfoRoute;