import {  Route, Switch } from "react-router-dom";
import OrderCustomize from './OrderCustomize'

const ViewCustomize=()=>{
    return(
        <div>
            <Switch>
                <Route path="/ViewCustomize/:customer_id/:cus_product_id">
                    <OrderCustomize />
                </Route>
            </Switch>
        </div>
    )
}

export default ViewCustomize;