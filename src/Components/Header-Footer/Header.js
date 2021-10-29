import React, { Component } from 'react';
import { Nav, Navbar, Form, Button, Input, ListGroup, ListGroupItem,  Modal, ModalHeader, ModalBody, NavbarBrand} from 'reactstrap';
import logo from '../Image/gift-logo.png';
import Login from '../Action/signin';
import Signup from '../Action/signup';
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Header.css";

class Header extends Component{
  constructor() {
    super();
    this.state = {
      signupmodel: false,
      loginmodel: false,
      search: {}
    }
    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(e) {
    this.setState({
      search : {
        query : e.target.value
      }
    })
  }
  render(){
    const signuptoggle = () => this.setState({signupmodel : !this.state.signupmodel});        
    const logintoggle = () => this.setState({loginmodel : !this.state.loginmodel});
    const logout = () => {localStorage.clear()}
    var admin = localStorage.getItem("admin");
    var userName = localStorage.getItem("name");
      var back = "back !"
      if (!userName){
        userName = ""
        back = "Please Login !"
      }

      const userlogin = () => {
        if (!userName){
          return(
            <div>
              <Button onClick={signuptoggle} style={{marginRight:"15px"}}>Sign UP</Button>
              <Button onClick={logintoggle}>Log IN</Button>
            </div>
          )
        }else{
            return(
              <div>
                <a href='/'>
                  <Button style={{"margin-right":"15px"}} onClick={logout} >
                      Log Out
                  </Button>
                </a>
              </div>
            )                  
        }
      }
    if(admin){
      return(
        <header>
          <Navbar>
            <Nav>
              <a href="/admin/home"><NavbarBrand>{userName}</NavbarBrand></a>
            </Nav>
          </Navbar>
        </header>
      )
    }
    return(
      <header className="container-fluid">
        <Navbar>
        <Nav className="navdropdown">
        <a href="/"><img src={logo} alt="myntraLOGO" className="logo" /></a>
        <NavbarBrand>Gift Shop India</NavbarBrand>
        
          <Form action={`/product/search/${this.state.search.query}`} className="input-group search" method="GET">
            <div className="input-group-btn">            
              <Input type="text" className="form-control" placeholder="Search the product, Brand and More" name="search" id="search" onChange={this.searchHandler} />
              <Button className="btn search-button"  type="submit">
              <i className="fa fa-search" style={{fontSize : "20px"}} aria-hidden="true"></i>
              </Button>            
            </div>
          </Form>   
        
        <nav className="navbar navbar-expand-md" style={{marginTop:"-75px", marginLeft:"82%"}}>
          <ul className="nav navbar-nav leftNav">
              <li className="profile nav-item"><a href='/profile' className="nav-link" >
                <span><i className="fa fa-user-o" style={{fontSize : "25px"}} ></i></span><br></br>Profile</a>
                  <br></br>
                  <div className="profile-content">
                      <div id="card1" className="card text-center profileCard">
                          <div className="card-body">
                              <p><b>Welcome {back}</b>
                                  <br>
                                  </br><b>{userName}</b>
                              </p>
                          </div>{userlogin()}
                          <hr></hr>
                            
                          <ListGroup>
                          <a href='/order'><ListGroupItem className="list" >Order</ListGroupItem></a>
                          <a href='/'><ListGroupItem className="list" >Gift</ListGroupItem></a>
                          <a href='/address'><ListGroupItem className="list" >Address</ListGroupItem></a>
                          <a href='/'><ListGroupItem className="list" >Contact US</ListGroupItem></a>
                          <a href='/'><ListGroupItem className="list" >Gift Shop</ListGroupItem></a>
                          </ListGroup>
                          <ListGroup>
                          <a href='/'><ListGroupItem className="list"  >Gift Card</ListGroupItem></a>
                          <a href='/'><ListGroupItem className="list"  >PhonePe Wallet</ListGroupItem></a>
                          <a href='/'><ListGroupItem className="list"  >Coupons</ListGroupItem></a>
                          <a href='/'><ListGroupItem className="list"  >Saved Cards</ListGroupItem></a>
                          <a href="/admin/login"><ListGroupItem className="list"  >Admin Login</ListGroupItem></a>
                          </ListGroup>
                              
                      </div>
                  </div>
              </li>
              
              <li className="nav-item"> <a href="/cart" className="nav-link" ><span><i className="fa fa-shopping-cart" style={{fontSize : "25px"}}></i></span><br></br>cart</a></li>
          </ul>
          <Modal isOpen={this.state.signupmodel} toggle={signuptoggle}>
              <ModalHeader toggle={signuptoggle}>SIGN UP</ModalHeader>
              <ModalBody>
              <Signup />
              </ModalBody>
          </Modal>
          <Modal isOpen={this.state.loginmodel} toggle={logintoggle}>
              <ModalHeader toggle={logintoggle}>SIGN IN</ModalHeader>
              <ModalBody>
              <Login />
              </ModalBody>
          </Modal>

        </nav>
        </Nav>
        
        
        </Navbar>
        
        

        

        
        
      </header>
    )
  }


}

export default Header