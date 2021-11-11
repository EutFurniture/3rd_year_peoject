import {Route, Switch } from "react-router-dom";
import EditPrioritizeOrders from './EditPrioritizeOrders'

const EditPrioritizeOrdersRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/EditPrioritizeOrdersRoute/:order_id">
                    <EditPrioritizeOrders/>
                </Route>
            </Switch>
        </div>
    )
}

export default EditPrioritizeOrdersRoute;