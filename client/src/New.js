import React, {useEffect,useState} from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './components/customer/blog/Home'
import Checkout from './components/customer/Products/Checkout'
import About from './components/customer/About'
import Login from './components/Login';
import Product  from './components/customer/Pproduct';
import Cart from './components/customer/Products/Cart/Cart'
import ProductList from './components/customer/Products/category/ProductList';
import Table from './components/customer/Products/category/Table';
import Chair from './components/customer/Products/category/Chair';
import Gift from './components/customer/Products/category/Gift';
import Bed from './components/customer/Products/category/Bed';
import Sofa from './components/customer/Products/category/Sofa';
import Detail from './components/customer/Products/Details';
import History from './components/customer/History';
import Profile from'./components/customer/Profile';
import Feedback from './components/customer/Feedback'
import Navbar from './components/customer/blog/Navbar'
import Form from './components/customer/Form'
import { useParams } from "react-router-dom";
import Axios from 'axios';
import Updateprofile from './components/customer/Updateprofile'
import Footer from './components/customer/Footer';
import Notification from './components/customer/Notification'
import Allnotify from './components/customer/Allnotify'

const New = () => {
  const[LoginSt, setLoginSt] = useState();
  const[user, setUser] = useState();
  const { customer_id } = useParams();

  useEffect(() => {

      const fetchData = async () => {
          
          const response = await Axios.get("http://localhost:3001/login");

           if (response.data.loggedIn) {

             const nm= response.data.user[0].u_email;
             console.log(nm);
              const response1 = await Axios.get('http://localhost:3001/customer', {
                params: {
                 email: nm
               }
              });
          
             setUser(response.data.user);
         
             const element = (
             <div>
               <Navbar  userData={response1.data[0]} />
             <div>
              <Switch>
              
              <Route path='/customer/profile'  >
                <Profile  userData={response1.data[0]}  />
                </Route>
              <Route path='/customer/feedback' >
              <Feedback   userData={response1.data[0]} />
                </Route>
                <Route path='/customer/cart'  >
                <Cart  userData={response1.data[0]} />
                </Route>
                <Route path='/customer/checkout'  >
                <Checkout    userData={response1.data[0]} />
                </Route>
                <Route path='/customer/about'  >
                <About    />
                </Route>
                <Route path='/customer/customization'  >
                <Form   userData={response1.data[0]} />
                </Route>
                <Route path='/customer/gift'  >
                <Gift   userData={response1.data[0]}/>
                </Route>
                <Route path='/customer/product'  >
                <Product   />
                </Route>
                
                <Route path='/customer/detail'  >
                <Detail   />
                </Route>
                <Route path='/customer/history'  >
                <History  userData={response1.data[0]} />
                </Route>
                <Route path='/customer/dashboard'  >
                <Home userData={response1.data[0]}  />
                </Route>
                <Route path='/customer/notification'  >
                <Notification />
                </Route>
                <Route path='/customer/updateprofile'  >
                <Updateprofile  userData={response1.data[0]} />
                </Route>
                <Route  path='/customer/dining'  >
                <ProductList userData={response1.data[0]} />
                </Route>
                <Route path='/customer/table'  >
                <Table  userData={response1.data[0]}/>
                </Route>
                <Route path='/customer/chair'  >
                <Chair  userData={response1.data[0]} />
                </Route>
                <Route path='/customer/bed'  >
                <Bed   userData={response1.data[0]}/>
                </Route>
                <Route path='/customer/sofa'  >
                <Sofa  userData={response1.data[0]}/>
                </Route>
                <Route path='/customer/Allnotify'  >
                <Allnotify  userData={response1.data[0]} />
                </Route>
          
           </Switch>
            </div>
           
            </div>       
              );

             setLoginSt(element);
          }
        else{
            const element = (<Login/>);
            setLoginSt(element);
        }
         

      };
      fetchData();
  },[customer_id]);

  return (
      <div className="">

              {LoginSt}
          
      </div>
  );
};

export default New;


         
           
           