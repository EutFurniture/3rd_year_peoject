import {Route, Switch} from "react-router-dom";

import DeliverInfo from './DeliverInfo'

const DeliverInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/DeliverInfoRoute/:id">
                    <DeliverInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default DeliverInfoRoute;