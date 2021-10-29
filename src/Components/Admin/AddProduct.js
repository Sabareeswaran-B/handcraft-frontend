import React, { useEffect, useState } from 'react';
import {Container, Input, Form, Row, Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { createProduct } from '../Action/action';


function AddProduct () {

    const[productID, setProductID]=useState("");
    const[productName, setProductName]=useState("");
    const[brandName, setBrandName]=useState("");
    const[productType, setProductType]=useState("");
    const[specialPrice, setSpecialPrice]=useState(Number);
    const[MRP, setMRP]=useState(Number);
    const[offer, setOffer]=useState("");
    const [constituents, setConstituents] =useState([]);
    const[details, setDetails]=useState("");
    const [admin, setAdmin] = useState(localStorage.getItem('admin'));



    const handleProductID = (e) => {
        setProductID(e.target.value)
    }
    const handleProductName = (e) => {
        setProductName(e.target.value)
    }
    const handleBrandName = (e) => {
        setBrandName(e.target.value)
    }
    const handleProductType = (e) => {
        setProductType(e.target.value)
    }
    const handleSpecialPrice = (e) => {
        setSpecialPrice(e.target.value)
    }
    const handleMRP = (e) => {
        setMRP(e.target.value)
    }
    const handleOffer = (e) => {
        setOffer(e.target.value)
    }
    const handleConstituents = (e) => {
        setConstituents(e.target.value)
    }
    const handleDetails = (e) => {
        setDetails(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            productID : productID,
            productName : productName,
            brandName : brandName,
            specialPrice : Number(specialPrice),
            MRP : Number(MRP),
            offer : offer,
            images : ["bakdcjkj"],
            productType : productType,
            details : details,
            constituents : [constituents],
            soldby : "pokjhg"
        }
        // console.log(newProduct)
        createProduct(newProduct)
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
                    <a href="/admin/product/add" style={{color:"black"}}><h5>Add Product</h5></a><br></br>
                    <a href="/admin/product/edit" style={{color:"white"}}><h5>Edit Product</h5></a><br></br>
                    <a href="/admin/order/manage" style={{color:"white"}}><h5>Manage Orders</h5></a><br></br>
                    <a href="/" style={{color:"white"}} onClick={()=>localStorage.clear()}><h5>Logout</h5></a>
                    {/* </Container> */}
                </div>
                <div className="col-lg-8">
                <Form>
                    <Input type="text" placeholder="Enter the product ID" name="productID" onChange={handleProductID} value={productID}/><br></br>
                    <Input type="text" placeholder="Enter the product Name" name="productName" onChange={handleProductName}  value={productName}/><br></br>
                    <Input type="text" placeholder="Enter the Brand Name" name="brandName" onChange={handleBrandName} value={brandName}/><br></br>
                    <Input type="number" placeholder="Enter the Special Price" name="specialPrice" onChange={handleSpecialPrice} value={specialPrice}/><br></br>
                    <Input type="number" placeholder="Enter the MRP" name="MRP" onChange={handleMRP} value={MRP}/><br></br>
                    <Input type="text" placeholder="Enter the offer" name="offer" onChange={handleOffer} value={offer}/><br></br>
                    <Input type="text" placeholder="Enter the product type" name="productType" onChange={handleProductType} value={productType}/><br></br>
                    <Input type="text" placeholder="Enter constituents" name="constituents" onChange={handleConstituents} value={constituents}/><br></br>
                    <Input type="textarea" placeholder="Enter the detailed summery of the product" name="details" onChange={handleDetails} value={details}/><br></br>
                    <Button  type="submit" className="form-sbutton" onClick={handleSubmit}>Submit</Button>
                </Form>
                </div>
            </Row>
        </div>
    )
}

export default AddProduct