import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Footer.css";
import { Row } from 'reactstrap';




class Footer extends Component{
        render(){
            var admin = localStorage.getItem("admin");
            if(admin){
                return(
                    <div></div>
                )
            }
            return(
           
              <footer className="jumbotron">
                <Row>
                  <div className="col-lg-4">
                    <p>THE INDIA CRAFT HOUSE</p>
                    <ul className="list-unstyled">
                        <li>About Us</li>
                        <li>Mission</li>
                        <li>Contact Us</li>
                        <li>Sell with Us</li>
                        <li>Fair Trade</li>
                        <li>Terms of Use</li>
                        <li>Privacy Policy</li>
                        <li>Disclaimer</li>
                        <li>Blog</li>
                        <li>Site Map</li>
                        <li>Terms of Service</li>
                        <li>Refund policy</li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <p>SHOP</p>
                    <ul className="list-unstyled">
                    <li>Reward Program</li>
                    <li>Gift Cards</li>
                    <li>Customized Orders</li>
                    <li>Bulk Orders</li>
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <p>HELP</p>
                    <ul className="list-unstyled">
                    <li>Customer Service</li>
                    <li>How To Order</li>
                    <li>Customized Orders</li>
                    <li>Billing & Payments</li>
                    <li>Shipping & Delivery</li>
                    <li>Refund, Returns & Exchanges</li>
                    <li>Discounts & Promotions</li>
                    <li>FAQ's</li>
                    </ul>
                  </div>
                </Row>
              </footer>

            
        )
    }
}

export default Footer