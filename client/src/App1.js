import React, {useEffect,useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import ViewAvailableDelivery from './components/dPerson/pages/ViewAvailableDelivery';
import Login from './components/Login';
import DpProfile from './components/dPerson/pages/DpProfile';
import UpdateEprofile from './components/dPerson/pages/UpdateEprofile';
import AddReturnedItem from './components/dPerson/pages/AddReturnedItem';
import ConfirmDelivery from './components/dPerson/pages/ConfirmDelivery';
import AvailableDeliveryInfo from './components/dPerson/pages/AvailableDeliveryInfo';
import AvailableDeliveryInfoRoute from './components/dPerson/pages/AvailableDeliveryInfoRoute';
import DpReturnItemInfo from './components/dPerson/pages/DpReturnItemInfo';
import DpReturnItemInfoRoute from './components/dPerson/pages/DpReturnItemInfoRoute';
import UpdateReturnDetail from './components/dPerson/pages/UpdateReturnDetail';
import UpdateReturnDetailRoute from './components/dPerson/pages/UpdateReturnDetailRoute';
import UpdateCashOnDeliveryBill from './components/dPerson/pages/UpdateCashOnDeliveryBill';
import UpdateCashOnDeliveryBillRoute from './components/dPerson/pages/UpdateCashOnDeliveryBillRoute';
import UpdateConDeliveryRoute from './components/dPerson/pages/UpdateConDeliveryRoute';
import UpdateConDelivery from './components/dPerson/pages/UpdateConDelivery';
import ViewCashon from './components/dPerson/pages/ViewCashon';
import DpDashboard from './components/dPerson/pages/DpDashboard';
import ViewProductDeliver from './components/dPerson/pages/ViewProductDeliver';
import AddForm from './components/dPerson/pages/AddForm';
import Maps from './components/dPerson/pages/Maps';


const App1 = () => {
    const[LoginSt, setLoginSt] = useState();
    const[user , setUser] = useState([]);
    const { email } = useParams();
  
    useEffect(() => {
  
        const fetchData = async () => {
            
            const response = await Axios.get("http://localhost:3001/login");

         if (response.data.loggedIn) {

           const nm= response.data.user[0].u_email;
            const response1 = await Axios.get('http://localhost:3001/employee', {
              params: {
               email: nm
             }
            });
            setUser(response.data.user);
            console.log(response1.data[0])
               const element = (
               <div>
                
               <div>
                <Switch>



                <Route path='/dPerson/DpDashboard'  >
                <DpDashboard userData={response1.data[0]}  />
                </Route>

                <Route path='/dPerson/ViewAvailableDelivery'  >
                <ViewAvailableDelivery  userData={response1.data[0]}  />
                </Route>
              
                <Route path='/dPerson/AddReturnedItem'  >
                < AddReturnedItem  userData={response1.data[0]}  />
                </Route>

                <Route path='/dPerson/ConfirmCashPay'  >
                < ViewCashon  userData={response1.data[0]}  />
                </Route>

                <Route path='/dPerson/ConfirmDelivery'  >
                <ConfirmDelivery  userData={response1.data[0]}  />
                </Route>


                 <Route path='/dPerson/DpProfile'  >
                <DpProfile  userData={response1.data[0]}  />
                </Route>
              
                <Route path='/dPerson/updateEprofile'  >
                < UpdateEprofile userData={response1.data[0]} />
               </Route>
          
               <Route path='/dPerson/AvailableDeliveryInfo'  >
                <AvailableDeliveryInfo userData={response1.data[0]} />
               </Route>

               <Route path='/dPerson/AvailableDeliveryInfoRoute'  >
                <AvailableDeliveryInfoRoute userData={response1.data[0]} />
               </Route>
               
               <Route path='/dPerson/DpReturnItemInfo'  >
                <DpReturnItemInfo userData={response1.data[0]} />
               </Route>

               <Route path='/dPerson/DpReturnItemInfoRoute'  >
                <DpReturnItemInfoRoute userData={response1.data[0]} />
               </Route>

               <Route path='/dPerson/UpdateReturnDetail'  >
                <UpdateReturnDetail userData={response1.data[0]} />
               </Route>

               <Route path='/dPerson/UpdateReturnDetailRoute'  >
                <UpdateReturnDetailRoute userData={response1.data[0]} />
               </Route>
              
               <Route path='/dPerson/UpdateCashOnDeliveryBill'  >
                <UpdateCashOnDeliveryBill userData={response1.data[0]} />
               </Route>

               <Route path='/dPerson/UpdateCashOnDeliveryBillRoute'  >
                < UpdateCashOnDeliveryBillRoute userData={response1.data[0]} />
               </Route>

               
               <Route path='/dPerson/UpdateConDelivery'  >
                <UpdateConDelivery userData={response1.data[0]} />
               </Route>

               <Route path='/dPerson/UpdateConDeliveryRoute'  >
                <UpdateConDeliveryRoute userData={response1.data[0]} />
               </Route>


               <Route path='/dPerson/AddForm'  >
                <AddForm userData={response1.data[0]}/>
               </Route>

               <Route path='/dPerson/ViewProductDeliver'  >
                <ViewProductDeliver />
               </Route>

               <Route path='/dPerson/Maps'  >
                <Maps />
               </Route>
               
             </Switch>
              </div>
             
              </div>       
                );
  
               setLoginSt(element);
            }
         else{
             const element = (<Login />);
              setLoginSt(element);
          } 
           
  
        };
        fetchData();
    },[email]);
  
    return (
        <div className="">
  
                {LoginSt}
            
        </div>
    );
  };
  
  export default App1;
  
  
           
             
             