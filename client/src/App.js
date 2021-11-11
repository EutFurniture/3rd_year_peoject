import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homel from './components/customer/landing/Home'
import Footer from './components/customer/Footer';
import Signin from './components/Login';
import ManageOtp from './components/customer/ManageOtp';
import SignUp from './components/SignUp';
import Login from './components/Login'

import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Aboutl from './components/customer/landing/About'
//import Customization  from './components/customer/Customization';
import Productl  from './components/customer/landing/Pproduct';
import ProductListl from './components/customer/landing/Products/ProductList';
import Detaill from './components/customer/landing/Products/Details';
import Table from './components/customer/landing/Products/Table';
import Chair from './components/customer/landing/Products/Chair';
import Bed from './components/customer/landing/Products/Bed';
import Sofa from './components/customer/landing/Products/Sofa';
import Pay from './components/customer/Products/Pay';
import Notification from './components/customer/Notification';
import category from './components/customer/Products/category/Table'
import New from './New'
import { Fragment } from 'react';

//Admin
import DashboardNew from "./components/admin/pages/DashboardNew";
import ManageUser from "./components/admin/pages/ManageUser";
import ManagePayments from "./components/admin/pages/ManagePayments";
import Categories from "./components/admin/pages/Categories";
import EditCategory from "./components/admin/pages/EditCategory";
import Category from "./components/admin/pages/Category"
import AddCategory from "./components/admin/pages/AddCategory";
import ManageProducts from "./components/admin/pages/ManageProducts";
import AddProductForm from "./components/admin/pages/AddProductForm";
import Product from "./components/admin/pages/Product";
import ProductEdit from "./components/admin/pages/ProductEdit"
import ManageGifts from "./components/admin/pages/ManageGifts";
import AddGift from "./components/admin/pages/AddGift";
import Gift from "./components/admin/pages/Gift"
import GiftEdit from "./components/admin/pages/GiftEdit";
import ManageEmployee from "./components/admin/pages/ManageEmployee";
import AddEmployeeForm from "./components/admin/pages/AddEmployeeForm"
import ManageOTPEmp from './components/admin/pages/ManageOTPEmp'
import Employee from "./components/admin/pages/Employee";
import EmpEdit from "./components/admin/pages/EmpEdit";
import MovingItems from "./components/admin/pages/MovingItems";
import ReportGeneration from './components/admin/pages/ReportGeneration';
import CustomizeOrder from "./components/admin/pages/CustomizeOrder"
import ViewCustomizedOrder from "./components/admin/pages/ViewCustomizedOrder";
import ViewCustomize from './components/admin/pages/ViewCustomize';
import Customize from "./components/admin/pages/Customize"
import Reject from "./components/admin/pages/Reject"
import ViewProfile from "./components/admin/pages/ViewProfile";
import UpdateProfile from "./components/admin/pages/UpdateProfile";


//DManager
import Dashboard1 from './components/dManager/pages/Dashboard';
import ManageDelivery from './components/dManager/pages/ManageDelivery';
import ManageDelivers from './components/dManager/pages/ManageDelivers';
import ManageReturnItems from './components/dManager/pages/ManageReturnItems';
import AssignDelivers from './components/dManager/pages/AssignDelivers';
import AddDelivers from './components/dManager/pages/AddDelivers';
import ManageCashOnDelivery from './components/dManager/pages/ManageCashOnDelivery';
import ManageSchedule from './components/dManager/pages/ManageSchedule';
import ManagePrioritize from './components/dManager/pages/ManagePrioritize';
import DeliverInfoRoute from './components/dManager/pages/DeliverInfoRoute';
import DeliverInfo from './components/dManager/pages/DeliverInfo';
import DeliveryInfoRoute from './components/dManager/pages/DeliveryInfoRoute';
import DeliveryInfo from './components/dManager/pages/DeliveryInfo';
import CashOnDeliveryInfoRoute from './components/dManager/pages/CashOnDeliveryInfoRoute';
import CashOnDeliveryInfo from './components/dManager/pages/CashOnDeliveryInfo';
import UpdateDelivery from './components/dManager/pages/UpdateDelivery';
import UpdateDeliveryRoute from './components/dManager/pages/UpdateDeliveryRoute';
import ManageReports from './components/dManager/pages/ManageReports';
import EditPrioritizeOrders from './components/dManager/pages/EditPrioritizeOrders';
import EditPrioritizeOrdersRoute from './components/dManager/pages/EditPrioritizeOrdersRoute';
import UpdateCashOnDelivery from './components/dManager/pages/UpdateCashOnDelivery';
import UpdateCashOnDeliveryRoute from './components/dManager/pages/UpdateCashOnDeliveryRoute';
import UpdateReturnItem from './components/dManager/pages/UpdateReturnItem';
import UpdateReturnItemRoute from './components/dManager/pages/UpdateReturnItemRoute';
import EditDelivers from './components/dManager/pages/EditDelivers';
import EditDeliversRoute from './components/dManager/pages/EditDeliversRoute';
import ManageProfile from './components/dManager/pages/ManageProfile';
import EditProfileRoute from './components/dManager/pages/EditProfileRoute';
import EditProfile from './components/dManager/pages/EditProfile';
import ManageOTP from './components/dManager/pages/ManageOTP';
import Notification_payment from './components/dManager/pages/Notification_payment';
import Notification_return from './components/dManager/pages/Notification_return';
import Notification_order from './components/dManager/pages/Notification_order';

import PdfComponent from './components/dManager/pages/pdf.component';


//Daranya
//sManager
import Dashboard from './components/sManager/pages/Dashboard';

import Sales_UpdateProfile from './components/sManager/pages/Sales_UpdateProfile';
import Sales_ViewProfile from './components/sManager/pages/Sales_ViewProfile';

import Payments from './components/sManager/pages/payments';
import Promotions from './components/sManager/pages/promotions';

import ManageCustom from './components/sManager/pages/ManageCustom';
import ManageOrders from './components/sManager/pages/ManageOrders';

import AddCustomForm from './components/sManager/pages/AddCustomForm';
import AddOrderForm from './components/sManager/pages/AddOrderForm';
import Sales_ViewProduct from './components/sManager/pages/Sales_ViewProduct';
import AddOrderItemForm from './components/sManager/pages/AddOrderItemForm';
import AddPaymentForm from './components/sManager/pages/AddPaymentForm';

import UpdateCustom from './components/sManager/pages/UpdateCustom';
import UpdateOrders from './components/sManager/pages/UpdateOrders';

import CustomEdit from './components/sManager/pages/CustomEdit';
import OrdersEdit from './components/sManager/pages/OrdersEdit';

//import GenerateReport1 from './components/sManager/pages/GenerateReport';
import ManageReports1 from './components/sManager/pages/ManageReports1';
import PdfComponent1 from './components/sManager/pages/pdf.component1';

import Sales_CashOnDeliveryInfoRoute from './components/sManager/pages/Sales_CashOnDeliveryInfoRoute';
import Sales_CashOnDeliveryInfo from './components/sManager/pages/Sales_CashOnDeliveryInfo';

import Sales_OrderInfoRoute from './components/sManager/pages/Sales_OrderInfoRoute';
import Sales_OrderInfo from './components/sManager/pages/Sales_OrderInfo';

import Sales_Notification_order from './components/sManager/pages/Sales_Notification_order';
//import Sales_UpdateProfile from './components/sManager/pages/Sales_UpdateProfile';




//Delivery Person
import App1 from './App1';

function App() {
  return (
      <Router>

    
 
       <div className="App">
          <Switch>
          <Route path='/' exact component={Homel} />
          <Route path='/login' exact >
                <Login  />
          </Route>
          <Route path='/signin'  >
                <Signin  />
          </Route>
          
          <Route path='/signup'  >
                <SignUp  />
          </Route>
          
          <Route path='/aboutl'  >
                <Aboutl  />
          </Route>
          <Route path='/productl'  >
                <Productl  />
          </Route>
         <Route path='/manageotp'>
               <ManageOtp />
         </Route>
          <Route path='/detaill'  >
                <Detaill  />
          </Route>
          <Route path='/dining'  >
                <ProductListl />
          </Route>
          <Route path='/chair'  >
                <Chair />
          </Route>
          <Route path='/table'  >
                <Table />
          </Route>
          <Route path='/bed'  >
                <Bed />
          </Route>
          <Route path='/sofa'  >
                <Sofa/>
          </Route>
          <Route path='/customer'  >
                <New />

          </Route>

          </Switch>

<Route path='/ForgetPassword' component = {ForgetPassword}/>
<Route path='/ResetPassword' component = {ResetPassword}/>

 {/* Admin */}
 <Route path='/admin/pages/DashboardNew' exact component={DashboardNew}/>
 <Route path='/admin/pages/ManageUser' component={ManageUser} />   
 <Route path='/admin/pages/ManagePayments' component={ManagePayments} />
 <Route path='/admin/pages/Categories' component={Categories} />    
 <Route path='/admin/pages/EditCategory' component={EditCategory} />        
 <Route path='/Category' component={Category} />  
 <Route path='/admin/pages/AddCategory' component={AddCategory} />  
 <Route path='/ManageProducts' component={ManageProducts} />    
 <Route path='/admin/pages/AddProductForm' component={AddProductForm} />
 <Route path='/Product' component={Product} />
 <Route path='/ProductEdit' component={ProductEdit} />
 <Route path='/ManageGifts' component={ManageGifts} />
 <Route path='/Gift' component={Gift} />
 <Route path='/GiftEdit' component={GiftEdit} />
 <Route path='/admin/pages/AddGift' component={AddGift} />
 <Route path='/admin/pages/AddEmployeeForm' component={AddEmployeeForm} />
 <Route path='/admin/pages/ManageEmployee' component={ManageEmployee} />
 <Route path='/admin/pages/ManageOTPEmp' component={ManageOTPEmp} />
 <Route path='/Employee' component={Employee} />
  <Route path='/EmpEdit' component={EmpEdit} />
  <Route path='/MovingItems' component={MovingItems} />
  <Route path='/ReportGeneration' component={ReportGeneration} />
  <Route path='/CustomizeOrder' component={CustomizeOrder} />
  <Route path='/admin/pages/ViewCustomizedOrder' component={ViewCustomizedOrder} />
  <Route path='/ViewCustomize' component={ViewCustomize} />
  <Route path='/Customize' component={Customize} />
 <Route path='/Reject' component={Reject} />
 <Route path='/admin/pages/ViewProfile' component={ViewProfile} />
 <Route path='/UpdateProfile' component={UpdateProfile} />


 {/* dManager */}
 <Route path='/dManager/pages/ManageProfile' component={ManageProfile}/>
          <Route path='/dManager/pages/Dashboard'  component={Dashboard1}/>
          <Route path='/dManager/pages/ManageDelivery' component={ManageDelivery}/>
          <Route path='/dManager/pages/ManageDelivers' component={ManageDelivers}/>
          <Route path='/dManager/pages/AddDelivers' component={AddDelivers}/>
          <Route path='/dManager/pages/ManageReturnItems' component={ManageReturnItems}/>
          <Route path='/dManager/pages/AssignDelivers' component={AssignDelivers}/>
          <Route path='/dManager/pages/ManageCashOnDelivery' component={ManageCashOnDelivery}/>
          <Route path='/dManager/pages/ManageSchedule' component={ManageSchedule}/>
          <Route path='/dManager/pages/ManagePrioritize' component={ManagePrioritize}/>
          <Route path='/dManager/pages/DeliverInfo' component={DeliverInfo}/>
          <Route path='/DeliverInfoRoute' component={DeliverInfoRoute}/>
          <Route path='/dManager/pages/DeliveryInfo' component={DeliveryInfo}/>
          <Route path='/DeliveryInfoRoute' component={DeliveryInfoRoute}/>
          <Route path='/dManager/pages/CashOnDeliveryInfo' component={CashOnDeliveryInfo}/>
          <Route path='/CashOnDeliveryInfoRoute' component={CashOnDeliveryInfoRoute}/>
          <Route path='/dManager/pages/UpdateDelivery' component={UpdateDelivery}/>
          <Route path='/UpdateDeliveryRoute' component={UpdateDeliveryRoute}/>
          <Route path='/dManager/pages/EditPrioritizeOrders' component={EditPrioritizeOrders}/>
          <Route path='/EditPrioritizeOrdersRoute' component={EditPrioritizeOrdersRoute}/>
          <Route path='/dManager/pages/UpdateCashOnDelivery' component={UpdateCashOnDelivery}/>
          <Route path='/UpdateCashOnDeliveryRoute' component={UpdateCashOnDeliveryRoute}/>
          <Route path='/dManager/pages/UpdateReturnItem' component={UpdateReturnItem}/>
          <Route path='/UpdateReturnItemRoute' component={UpdateReturnItemRoute}/>
          <Route path='/dManager/pages/EditDelivers' component={EditDelivers}/>
          <Route path='/EditDeliversRoute' component={EditDeliversRoute}/>
          <Route path='/dManager/pages/ManageReports' component={ManageReports}/>
          <Route path='/EditProfileRoute' component={EditProfileRoute}/>
          <Route path='/dManager/pages/EditProfile' component={EditProfile}/>
          <Route path='/dManager/pages/ManageOTP' component={ManageOTP}/>
          <Route path='/dManager/pages/Notification_payment' component={Notification_payment}/>
          <Route path='/dManager/pages/Notification_return' component={Notification_return}/>
          <Route path='/dManager/pages/Notification_order' component={Notification_order}/> 
          <Route path='/dManager/pages/pdf.component' component={PdfComponent}/>

{/* SalesManager */}
{/* SalesManager */}
<Route path='/sManager/pages/Dashboard' exact component={Dashboard}/>
      

      <Route path='/sManager/pages/payments' component={Payments}/>
      <Route path='/sManager/pages/promotions' component={Promotions}/>
    
      <Route path='/sManager/pages/ManageCustom' component={ManageCustom}/>
      <Route path='/sManager/pages/ManageOrders' component={ManageOrders}/>
      <Route path='/CustomEdit' component={CustomEdit} />
      <Route path='/OrdersEdit' component={OrdersEdit} />

      <Route path='/Sales_UpdateProfile' component={Sales_UpdateProfile} />

      {/* <Route path='/sManager/pages/Sales_UpdateProfile' component={Sales_UpdateProfile}/> */}
      <Route path='/sManager/pages/Sales_ViewProfile' component={Sales_ViewProfile}/>

      <Route path='/sManager/pages/AddCustomForm' component={AddCustomForm}/>
      <Route path='/sManager/pages/AddOrderForm' component={AddOrderForm}/>
      <Route path='/sManager/pages/Sales_ViewProduct' component={Sales_ViewProduct}/>
      <Route path='/sManager/pages/AddPaymentForm' component={AddPaymentForm}/>
      <Route path='/sManager/pages/AddOrderItemForm' component={AddOrderItemForm}/>

      <Route exact path="/sManager/pages/UpdateCustom" component={UpdateCustom}/> 
      <Route exact path="/sManager/pages/UpdateOrders" component={UpdateOrders}/>

      {/* <Route path='/sManager/pages/GenerateReport' component={GenerateReport1}/> */}
      <Route path='/sManager/pages/ManageReports1' component={ManageReports1}/>
      <Route path='/sManager/pages/pdf.component1' component={PdfComponent1}/>
      
      <Route path='/sManager/pages/Sales_CashOnDeliveryInfo' component={Sales_CashOnDeliveryInfo}/>
      <Route path='/Sales_CashOnDeliveryInfoRoute' component={Sales_CashOnDeliveryInfoRoute}/>
         
      <Route path='/sManager/pages/Sales_OrderInfo' component={Sales_OrderInfo}/>
      <Route path='/Sales_OrderInfoRoute' component={Sales_OrderInfoRoute}/>
      
      <Route path='/sManager/pages/Sales_Notification_order' component={Sales_Notification_order}/>  
 

      {/* Delivery Person */}
      <Route path='/dPerson' component={App1}/>
  
         </div>
         </Router>

  
);
}

export default App




