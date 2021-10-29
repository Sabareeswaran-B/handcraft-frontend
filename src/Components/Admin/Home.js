import React, { useEffect, useState } from 'react';
import { Container, Row, CardImg, CardTitle, Card } from 'reactstrap';
import Slider from 'react-slick';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/Product.css'


function Home () {

    const [products, setProducts] = useState([]);
    const Jwt = localStorage.getItem('token');
    const [admin, setAdmin] = useState(localStorage.getItem('admin'));


    useEffect(() => {
        axios.get(`http://localhost:9000/admin/getAllProducts`,
        {
            headers : {Authorization : `Bearer ${Jwt}`},
        })
        .then(res => setProducts(res.data))
        .catch(err => console.error(`Error : ${err}`))
    },[])

    const sliders = (props) => {
        return props.map(data => {
          return (
            <CardImg src={data.url} alt="imag">
            </CardImg>
          );
        });
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplay : false,
        arrows : false
    };

    const ProductCard =(props)=>{
        return(
            <div className="col-lg-3">
                <a href={props.href} style={{color:"black",textDecoration:"none"}} >
                <Card style={{height:"75%",width:"75%", border:"none"}} >
                    <Slider style={{height:"300px",width:"200px"}} {...settings}>{sliders(props.src)}</Slider>
                <CardTitle style={{textAlign:"center"}}>
                    <b>{props.brand}</b>
                </CardTitle>            
                </Card>
                </a>
            </div>
        )
    }

    const GetProducts = () => {
        return products.map(data => {
            return(
                <ProductCard src={data.images} 
                href = {`/product/${data.productType}/${data.productID}`}
                brand = {data.brandName} />
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
                    
                    <a href="/admin/home" style={{color:"Black"}}><h5>Home</h5></a><br></br>
                    <a href="/admin/product/add" style={{color:"white"}}><h5>Add Product</h5></a><br></br>
                    <a href="/admin/product/edit" style={{color:"white"}}><h5>Edit Product</h5></a><br></br>
                    <a href="/admin/order/manage" style={{color:"white"}}><h5>Manage Orders</h5></a><br></br>
                    <a href="/" style={{color:"white"}} onClick={()=>localStorage.clear()}><h5>Logout</h5></a>
                    {/* </Container> */}
                </div>
                <div className="col-lg-9">
                    <GetProducts />
                </div>
            </Row>
        </div>
    )

}

export default Home