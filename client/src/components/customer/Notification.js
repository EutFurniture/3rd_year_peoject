import { Route, Switch } from "react-router-dom";
import NotificationResult from "./NotificationResult";

const Notification=()=>{
    return(
        <div>
            <Switch>
                <Route path="/customer/notification/:id/:cid/:cuid">
                    <NotificationResult />
                </Route>
            </Switch>
        </div>
    )
}

export default Notification;