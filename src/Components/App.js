import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BackToTop from "react-back-to-top-button";

import Header from './Header-Footer/Header';
import Profile from './Profile/Profile';
import Slideimg from './Slider/Slick';
import Gallery from './Gallery/Gallery';
import ProductList from './Products/ProductList';
import ProductPage from './Products/ProductDetails';
import cart from './Cart/Cart';
import Address from './Address/Address';
import Payment from './Payment/paymentMethod'
import OrderPage from './Order/Order';
import OrderDetails from './Order/OrderDetails';
import Footer from './Header-Footer/Footer';

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CSS/App.css';
import Login from './Admin/Login';
import Home from './Admin/Home';
import AddProduct from './Admin/AddProduct';
import EditProduct from './Admin/EditProduct';
import ManageOrder from './Admin/ManageOrder';




class App extends Component {
    render(){
        return(
        <div>
        <ToastContainer 
        autoClose={1500}
        closeOnClick
        draggable
        pauseOnHover={false}
        hideProgressBar={true}
        />
        <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
        >
            <span>^</span>
        </BackToTop>
        <Header />     
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Slideimg />
                    <Gallery />
                </Route>
                <Route exact path="/admin/login" component={Login}></Route>
                <Route exact path="/product/search/:query" component={ProductList}></Route>
                <Route exact path="/product/:productType" component={ProductList}></Route>
                <Route exact path="/product/:productType/:id" component={ProductPage}></Route>
                <Route exact path="/cart" component={cart}></Route>
                <Route exact path="/cart/address" component={Address}></Route>
                <Route exact path="/cart/address/payment" component={Payment}></Route>
                <Route exact path="/address" component={Address}></Route>
                <Route exact path="/order" component={OrderPage}></Route>
                <Route exact path="/order/orderdetails/:id" component={OrderDetails}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path = "/admin/home" component={Home}></Route>
                <Route exact path = "/admin/product/add" component={AddProduct}></Route>
                <Route exact path = "/admin/product/edit" component={EditProduct}></Route>
                <Route exact path = "/admin/order/manage" component={ManageOrder}></Route>

            </Switch>
        </Router>
        <Footer />
        </div>
        );
    }
}

export default App;