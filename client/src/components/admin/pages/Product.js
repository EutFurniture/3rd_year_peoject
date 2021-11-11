import {  Route, Switch } from "react-router-dom";
import ProductInfo from './ProductInfo'
const Product=()=>{
    return(
        <div>
            <Switch>
                <Route path="/Product/:product_id">
                    <ProductInfo />
                </Route>
            </Switch>
        </div>
    )
}

export default Product;