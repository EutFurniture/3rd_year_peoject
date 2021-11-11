import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import EmpInfo from './EmpInfo'
const Employee=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Employee/:id">
                    <EmpInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Employee;