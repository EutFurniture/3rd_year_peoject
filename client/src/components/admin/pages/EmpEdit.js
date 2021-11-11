import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee";
const EmpEdit=()=>{
    return(
        <div>
            <Switch>
                <Route path="/EmpEdit/:id">
                    <UpdateEmployee />
                </Route>
            </Switch>
        </div>
    )
}

export default EmpEdit;