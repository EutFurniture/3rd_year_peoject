import { Route, Switch } from "react-router-dom";
import RejectOrder from './RejectOrder'

const Reject=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Reject/:customer_id/:cus_product_id">
                    <RejectOrder />
                </Route>
            </Switch>
        </div>
    )
}

export default Reject;