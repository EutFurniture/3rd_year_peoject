import { Route, Switch } from "react-router-dom";
import AcceptOrder from './AcceptOrder'
import AcceptOrderNew from './AcceptOrderNew'

const Customize=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Customize/:customer_id/:cus_product_id">
                    < AcceptOrderNew/>
                </Route>
            </Switch>
        </div>
    )
}

export default Customize;