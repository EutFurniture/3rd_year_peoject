import {Route, Switch} from "react-router-dom";

import Sales_OrderInfo from './Sales_OrderInfo'

const Sales_OrderInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Sales_OrderInfoRoute/:order_id">
                    <Sales_OrderInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default Sales_OrderInfoRoute;