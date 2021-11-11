import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import UpdateOrders from './UpdateOrders'
const OrdersEdit=()=>{
    return(
        <div>
            <Switch>
                <Route path="/OrdersEdit/:order_id">
                    <UpdateOrders />
                </Route>
            </Switch>
        </div>
    )
}

export default OrdersEdit;