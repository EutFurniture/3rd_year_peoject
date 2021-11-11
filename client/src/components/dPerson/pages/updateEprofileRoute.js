import { Route, Switch } from "react-router-dom";
import updateEprofile from './UpdateReturnDetail'

const updateEprofileRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/employee/updateEprofileRoute/:employee_id">
                    <updateEprofile/>
                </Route>
            </Switch>
        </div>
    )
}

export default updateEprofileRoute;