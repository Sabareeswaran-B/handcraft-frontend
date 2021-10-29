import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, Row, CardTitle } from 'reactstrap';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { insertcart } from '../Action/action';
import rating from '../Image/image 73.png'
import "bootstrap/dist/css/bootstrap.min.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/Product.css'




function Product (props) {
    var id = props.match.params.id
    var userId = localStorage.getItem('name')
    const [product, setProduct] = useState({});
    const [productType , setProductType] = useState(props.match.params.productType);
    const [similarProduct, setSimilarProduct] = useState([])
    const [images, setImages] = useState([]);
    const [constituents, setConstituents] =useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:9000/product/${id}`)
        .then(res => getProduct(res.data))
        .catch(err => console.error(`Error : ${err}`))        
    },[])

    const getProduct = (props) => {
        setProduct(props)
        setImages(props.images)
        setConstituents(props.constituents)
        setCart({
            userID : localStorage.getItem('id'),
            productID : props._id,
            qty : '1',
            totalPrice : props.specialPrice
        })
    }

    const getSimilarProduct = () => {
        // console.log(productType)
        axios.get(`http://localhost:9000/similar-product/${productType}`)
        .then(res => setSimilarProduct(res.data))
        .catch(err => console.error(`Error : ${err}`))
    }

    
    const addToCart = () => {
        if(userId){
            console.log(cart)
            insertcart(cart)
        } else {
            toast.error("Please Login!")
        }
               
    }

    const ProductImage = (props) => {
        return(
            <div className="shirtcard">
                <Card className="card" style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"30%",height:"30%"}}>
                <CardImg className="shirt" src={props.src} alt="gift" />
                </Card>
            </div>
        )
    }

    const imageCard = () => {
        return images.map(data => {
            return (              
              <ProductImage src = {data.url}></ProductImage>                   
            );
        });
    }

    const displayConstituents = (props) => {
        return props.map(data => {
            return (              
                <p>{data}</p>                   
            );
        });
    }

    const sliders = (props) => {
        return props.map(data => {
          return (
            <CardImg src={data.url} alt="imag">
            </CardImg>
          );
        });
    }

    const similarProductsettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplay : false
    };

    const SimilarProductCard = (props) => {
        return(
        <div className="col-lg-3">
            <a href={props.href} style={{color:"black",textDecoration:"none"}} >
            <Card style={{height:"75%",width:"75%", border:"none"}} >
                <Slider style={{height:"300px",width:"200px"}} {...similarProductsettings}>{sliders(props.src)}</Slider>
            <CardTitle style={{textAlign:"center"}}>
                <b>{props.brand}</b>
                <p>{props.name}</p>
                <p><b>{props.specialPrice}  </b><strike>  ({props.realPrice}) </strike></p>
            </CardTitle>            
            </Card>
            </a>
        </div>
        )
    }
    const SimilarProductGallery = () =>{
        return similarProduct.map(data => {
            return(
                <SimilarProductCard src={data.images} 
                href = {`/product/${data.productType}/${data.productID}`}
                brand = {data.brandName} 
                name = {data.productName} 
                specialPrice = {`RS. ${data.specialPrice}`} 
                realPrice = {`Rs. ${data.MRP}`} />
            )
        })
    }
    const displaySimilarProducts = () => {
    // console.log(similarProduct)
        if(similarProduct){
            return(
                <SimilarProductGallery />
            )
        } else {
            return(
                <div></div>
            )
        }
    }

    const settings = {
        dots: true,
        lazyLoad:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        // fade:true,
        slidesToScroll: 1,
        autoplay: true,
        // arrows : true
      };

    return(
        <div className="container-fluid">
            <div className="container">
            <Slider {...settings}>{imageCard()}</Slider>
                
                {/* <a> <img src = {image} alt="image" style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"20%",height:"20%"}}/> </a> */}
            </div>
            <div className="container productContainer">
                <img src={rating} alt="rating" style={{width:"50%",height:"50%"}} />
                <h5>Rs. {product.specialPrice}</h5>
                <p>{product.details}</p>
                <h5>Key Constituents</h5>
                {displayConstituents(constituents)}
                <Button style={{backgroundColor:"Orange", display:"block", marginRight:"auto", marginLeft: "auto", width:"500px"}} onClick={addToCart}>Add to cart</Button>
            </div>
            <br></br>
            <br></br>
            <Button style={{backgroundColor:"white",color:"black", display:"block",borderRadius:"0", marginRight:"auto", marginLeft: "auto", width:"85%"}} onClick={getSimilarProduct}>Similar Gifts Recommendations</Button>
            <br></br>
            <hr></hr>
            {displaySimilarProducts()}        
        </div>
    )
}

export default Product;
