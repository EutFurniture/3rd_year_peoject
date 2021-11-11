import {  Route, Switch } from "react-router-dom";
import EditProducts from './EditProducts'
const ProductEdit=()=>{
    return(
        <div>
            <Switch>
                <Route path="/ProductEdit/:product_id">
                    <EditProducts />
                </Route>
            </Switch>
        </div>
    )
}

export default ProductEdit;
