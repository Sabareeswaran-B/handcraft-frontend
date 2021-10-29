import React, { useEffect, useState } from 'react';
import { Container, Row, CardImg, CardTitle, Card, Button } from 'reactstrap';
import moment from 'moment';
import Slider from 'react-slick';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/Product.css'


function ManageOrder () {


    const Jwt = localStorage.getItem('token');
    const [admin, setAdmin] = useState(localStorage.getItem('admin'));
    const [order, setOrder] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:9000/admin/getAllOrders`,
        {
            headers : {Authorization : `Bearer ${Jwt}`}
        })
        .then(res => setOrder(res.data))
        .catch(err => console.error(`Error : ${err}`))
    },[])


    const OrderCard = (props) => {
        return(
            <Row style={{marginTop:"50px"}}>
                <div className="col-lg-3">
                    <Card className="card-two">
                        <a href={`/product/${props.product.productID.productType}/${props.product.productID.productID}`}>
                            <CardImg src={props.src} className="card-two" alt="imag"></CardImg>
                        </a>
                    </Card>
                </div>
                <div className="col-lg-9">
                    <Row className="row-one">
                        <div className="col-lg-9" >
                            <h6><b>{props.productName}</b></h6>
                            <p><b>From : </b>{props.brandName}</p>                            
                            <p><b>Size : </b>{props.size} <b className="ml-3">Quantity : </b>{props.qty}</p>
                            <p><b>Ordered On : </b>{props.date}</p>
                        </div>
                        <div className="col-lg-3">
                            <h6 className="right"><b>Rs. {props.price}</b></h6>
                            <h6 className="right grey"><b>{props.offer}</b></h6>
                            <a href={`/order/orderdetails/${props.href}`}>
                            <Button className="detailbtn">
                            View Details<i className="fa fa-angle-double-right"></i>
                            </Button></a>
                        </div>
                    </Row>
                </div>
            </Row>
        )
    }

    const GetOrders = () => {
        if(!order[0]){
            return(
                <div style={{marginTop:"150px"}}>
                    <h3 className="center grey"><b>Hey, it feels so light!</b></h3>
                    <p className="center grey">There is nothing in your order List. Lets start shopping</p>
                    <a href="/"> <Button className="continuebtn" style={{marginLeft:"430px"}}>Continue Shopping</Button></a>
                </div>
            )
        }
        return order.map(data => {

            return(
                <OrderCard 
                    product = {data}
                    src = {data.productID.images[0].url}
                    productName = {data.productID.productName}
                    brandName = {data.productID.brandName}
                    price = {data.totalPrice}
                    offer = {data.productID.offer}
                    qty = {data.qty}
                    size = {data.size}
                    date = {moment(data.createdAt).format("MMM Do YY")}
                    href = {data._id}
                />
            )
        })
    }

    if(!admin){
        return(
            <Container style={{marginTop:"230px",marginBottom:"200px"}}>
                <h3 style={{textAlign:"center",color:"orange"}}><b>Please Login!</b></h3>
                <h5 style={{textAlign:"center",color:"orange"}}>If you are an admin,Login to your accout.</h5>
                <p style={{textAlign:"center",color:"orange"}}>If you are not then login/register as a user.</p>
            </Container>
        )
    }
    return(
        <div>
            <Row>
                <div className="col-lg-3" style={{padding:"50px 5px 500px 50px", backgroundColor:"#8EBAD2", color: "white", marginTop:"-50px"}}>
                    
                    <a href="/admin/home" style={{color:"white"}}><h5>Home</h5></a><br></br>
                    <a href="/admin/product/add" style={{color:"white"}}><h5>Add Product</h5></a><br></br>
                    <a href="/admin/product/edit" style={{color:"white"}}><h5>Edit Product</h5></a><br></br>
                    <a href="/admin/order/manage" style={{color:"black"}}><h5>Manage Orders</h5></a><br></br>
                    <a href="/" style={{color:"white"}} onClick={()=>localStorage.clear()}><h5>Logout</h5></a>
                    {/* </Container> */}
                </div>
                <div className="col-lg-9">
                    <GetOrders />
                </div>
            </Row>
        </div>
    )

}

export default ManageOrder