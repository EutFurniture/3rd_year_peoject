import {  Route, Switch } from "react-router-dom";
import GiftInfo from './GiftInfo'
const Gift=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Gift/:product_id">
                    <GiftInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Gift;