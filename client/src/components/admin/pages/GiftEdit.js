import {  Route, Switch } from "react-router-dom";
import EditGifts from './EditGifts'
const GiftEdit=()=>{
    return(
        <div>
            <Switch>
                <Route path="/GiftEdit/:product_id">
                    <EditGifts />
                </Route>
            </Switch>
        </div>
    )
}

export default GiftEdit;
