import {Route, Switch} from "react-router-dom";

import Sales_CashOnDeliveryInfo from './Sales_CashOnDeliveryInfo'

const Sales_CashOnDeliveryInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Sales_CashOnDeliveryInfoRoute/:order_id">
                    <Sales_CashOnDeliveryInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default Sales_CashOnDeliveryInfoRoute;