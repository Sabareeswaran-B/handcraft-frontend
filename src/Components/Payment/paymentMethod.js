import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Card, Row, Button, Container, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createOrder } from '../Action/action';
import CardDetails from '../Action/cardDetails';
import "bootstrap/dist/css/bootstrap.min.css";


function Payment () {
    const userID = localStorage.getItem('id')
    const JWT = localStorage.getItem('token')
    const [cardModal, setCardModal] = useState(false)
    const [addressID, setAddressID] = useState(localStorage.getItem('addressID'))
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(Number); 

    const cardToggle = () => {
        setCardModal(!cardModal)
    }

    const getCart = (props) => {
        setCart(props)
        setTotalPrice(props[0].totalPrice)
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/bag/getBag/${userID}`,
        {
            headers : {Authorization : `Bearer ${JWT}`}
        })
        .then(res => getCart(res.data))
        .catch(err => console.error(`Error : ${err}`))
    },[])

    console.log(cart)
    const placeOrder = () => {
        if(!addressID){
            toast("Please Select a Address")
        }else{
            return cart.map(data => {
                let order = {
                    userID : userID,
                    addressID : addressID,
                    productID : data.productID._id,
                    qty : data.qty,
                    totalPrice : data.totalPrice,
                    id : data._id
                }
                createOrder(order)
            })                        
        }
    }

    return(
        <div className="container">
            <Row>
                <div className="col-lg-8">
                    <div className="container">
                        
                        <Label ><Input type="radio" name="method" value="cod" /><b>Cash On Delivery</b></Label><br></br><br></br>
                        
                        <Label ><Input type="radio" name="method" value="card" onClick={cardToggle}/><b>Debit/Credit Card</b></Label><br></br><br></br>
                        
                        <a href="/order"><Button style={{width:"300px"}} onClick = {placeOrder}>Continue</Button></a>
                        <Modal isOpen={cardModal} toggle={cardToggle}>
                            <ModalHeader toggle={cardToggle}>Card Details</ModalHeader>
                            <ModalBody>
                                <CardDetails />
                                <Button onClick={cardToggle}>Pay Now</Button>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
                <div className="col-lg-4">
                {/* <div className="container"> */}
                    <Row>
                        <div className="col-lg-6">
                            <h6><b>BAG TOTAL : </b></h6>
                            <h6><b>DELIVERY CHARGE: </b></h6>                            
                        </div>

                        <div className="col-lg-6">
                            <h6 style={{textAlign:"right"}}><b>Rs. {totalPrice} </b></h6>
                            <h6 style={{textAlign:"right"}}><b>Rs. 0 </b></h6>                            
                        </div>
                                          
                    </Row>
                    <hr></hr>
                    <Row>
                        <div className="col-lg-6">
                            <h6><b>TOTAL : </b></h6>
                        </div>
                        <div className="col-lg-6">
                            <h6 style={{textAlign:"right"}}><b>Rs. {totalPrice}</b></h6>
                        </div>
                    </Row>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    
                {/* </div> */}
                </div>
            </Row>
        </div>
    )
}

export default Payment