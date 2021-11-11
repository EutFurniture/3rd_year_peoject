import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import UpdateCustom from './UpdateCustom'
const CustomEdit=()=>{
    return(
        <div>
            <Switch>
                <Route path="/CustomEdit/:customer_id">
                    <UpdateCustom />
                </Route>
            </Switch>
        </div>
    )
}

export default CustomEdit;