import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import {Row, Card, Breadcrumb, BreadcrumbItem, CardImg, CardTitle, Button } from 'reactstrap'
import { inArray } from 'jquery';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function ProductList(props){

    // var productType = props.match.params.productType;
    const [productType , setProductType] = useState(props.match.params.productType);
    const [productTypeFilter, setProductTypeFilter] = useState([])
    const [path , setPath] = useState(props.match.path);
    const [searchQuery, setSearchQuery] = useState(props.match.params.query);
    const [product, setProduct] = useState([]);
    const [brandArrayFilter, setBrandArrayFilter] = useState([]);
    const [filter, setFilter] = useState(["0","100000"]);
    const [sort, setSort] = useState('');
    const [brand, setBrand] = useState([]);
    var brandObject = {
        brandName : brand
    }

    // console.log(props)
    const getProduct = (props) => {
        setProduct(props)
        setBrandArrayFilter(props)
    //     axios.post(`http://localhost:9000/shirts/sort?gender=${props[0].gender}`,brandObject)
    //         .then(res => setProductTypeFilter(res.data))
    //         .catch(err => console.error(`Error : ${err}`))
    // }
    // const getProductWithGender = (props) => {
    //     setProduct(props)
    //     setBrandArrayFilter(props)
    //     setProductTypeFilter(props)
    }

    useEffect(() => {
        if(path === "/product/search/:query"){
            var search = {
                query : `\"${searchQuery}\"`
            }
            axios.post(`http://localhost:9000/product/search`,search)
            .then(res => getProduct(res.data))
            .catch(err => console.error(`Error : ${err}`))
        } else {
            axios.post(`http://localhost:9000/shirts/sort?productType=${productType}`,brandObject)
            .then(res => getProduct(res.data))
            .catch(err => console.error(`Error : ${err}`))
            // axios.post(`http://localhost:9000/shirts/sort?gender=${gender}`,brandObject)
            // .then(res => setProductTypeFilter(res.data))
            // .catch(err => console.error(`Error : ${err}`))    
        }
    },[])


    // const genderHandler = (e) => {
    //     setGender(e.target.value)
    //     axios.post(`http://localhost:9000/shirts/sort?gender=${e.target.value}`,brandObject)
    //     .then(res => getProductWithGender(res.data))
    //     .catch(err => console.error(`Error : ${err}`))
    // }
    const productTypeHandler = (e) => {
        setProductType(e.target.value)
        axios.post(`http://localhost:9000/shirts/sort?productType=${e.target.value}&specialPrice[$lte]=${filter[1]}&specialPrice[$gte]=${filter[0]}&sort=${sort}`,brandObject)
        .then(res => getProduct(res.data))
        .catch(err => console.error(`Error : ${err}`))
    }
    const priceHandler = (e) => {
        const price = e.target.value.split(',');
        // console.log(`http://localhost:9000/shirts/sort?productType=${productType}&gender=${gender}&specialPrice[$lte]=${price[1]}&specialPrice[$gte]=${price[0]}&sort=${sort}`)
        setFilter(price)
        axios.post(`http://localhost:9000/shirts/sort?productType=${productType}&specialPrice[$lte]=${price[1]}&specialPrice[$gte]=${price[0]}&sort=${sort}`,brandObject)
        .then(res => setProduct(res.data))
        .catch(err => console.error(`Error : ${err}`))
    }
    const sortHandler = (e) => {
        setSort(e.target.value)
        axios.post(`http://localhost:9000/shirts/sort?productType=${productType}&specialPrice[$lte]=${filter[1]}&specialPrice[$gte]=${filter[0]}&sort=${e.target.value}`,brandObject)
        .then(res => setProduct(res.data))
        .catch(err => console.error(`Error : ${err}`))
    }
    const brandHandler = (e) => {
        var brandArray = brand
        // var isChecked = e.target.checked
        var isChecked = brandArray.includes(e.target.name)
        // console.log(isChecked)
        if (!isChecked){
            brandArray.push(e.target.name)
            setBrand(brandArray)
        } else {
            var index = brandArray.indexOf(e.target.name)
            brandArray.splice(index, 1)
            setBrand(brandArray)
        }
        // console.log(brandArray)
        brandObject = {
            brandName : brandArray
        }
        axios.post(`http://localhost:9000/shirts/sort?productType=${productType}&specialPrice[$lte]=${filter[1]}&specialPrice[$gte]=${filter[0]}&sort=${sort}`,brandObject)
        .then(res => setProduct(res.data))
        .catch(err => console.error(`Error : ${err}`))
    }
    
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
        autoplay : false
    };

    const ProductCard = (props) => {
        return(
        <div className="col-lg-3">
            <a href={props.href} style={{color:"black",textDecoration:"none"}} >
            <Card style={{height:"75%",width:"75%", border:"none"}} >
                <Slider style={{height:"300px",width:"200px"}} {...settings}>{sliders(props.src)}</Slider>
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


    const GetProduct = () =>{
        return product.map(data => {
            return(
                <ProductCard src={data.images} 
                href = {`/product/${data.productType}/${data.productID}`}
                brand = {data.brandName} 
                name = {data.productName} 
                specialPrice = {`RS. ${data.specialPrice}`} 
                realPrice = {`Rs. ${data.MRP}`} />
            )
        })
    }

    const BrandFilter = () => {
        let duplicateArray = [];
        return brandArrayFilter.map(data => {
            if(inArray(data.brandName, duplicateArray) === -1 ){
                duplicateArray.push(data.brandName)
                return(
                    <div>
                        <lable><input type="checkbox" name={data.brandName} onClick={brandHandler} /> {data.brandName}</lable>
                    </div>
                )
            } else {
                return null
            }                      
        })
    }

    const GetProductType = () => {
        let duplicateArray = [];
        if(productTypeFilter){
            return productTypeFilter.map(data => {
                if(inArray(data.productType, duplicateArray) === -1 ){
                    duplicateArray.push(data.productType)
                    return(
                        <div>
                            <lable><input type="radio" name='productType' value={data.productType} onClick={productTypeHandler} /> {data.productType}</lable>
                        </div>
                    )
                } else {
                    return null
                }                
            })
        } else {
            return(
                <div></div>
            )
        }
    }

    return(
    <div className='container-fluid'>
        <Breadcrumb style={{backgroundColor:"white"}}>
        <BreadcrumbItem>
            <a href="/" className="listpageBreadcrum">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <a href="/" className="listpageBreadcrum">Clothing</a>        
        </BreadcrumbItem>
        <BreadcrumbItem><b>{productType}</b></BreadcrumbItem>
        </Breadcrumb>
        
        <Row>
            <div className="col-lg-2">
                <Row>
                <div className="col-lg-6">
                <h3><b>Filter</b></h3>
                </div>
                <div className="col-lg-6">
                <a href={`/product/${productType}`}><Button className="clrbtn">Clear All</Button></a>
                </div>
                </Row>
                {/* <lable><input type="radio" name='gender' value="men" onClick={genderHandler} /> Men</lable><br></br>
                <lable><input type="radio" name='gender' value="women" onClick={genderHandler} /> Women</lable><br></br>
                <lable><input type="radio" name='gender' value="kids" onClick={genderHandler} /> Boys</lable><br></br>
                <lable><input type="radio" name='gender' value="kids" onClick={genderHandler} /> Girls</lable><hr></hr> */}

                <h6><b>CATEGORIES</b></h6>
                <GetProductType /><hr></hr>
                
                <h6><b>PRICE</b></h6>
                <lable><input type="radio"  name="specialPrice" value="0,500" onClick={priceHandler}/> Below 500</lable><br></br>
                <lable><input type="radio"  name="specialPrice" value="0,1000" onClick={priceHandler}/> Below 1000</lable><br></br>
                <lable><input type="radio"  name="specialPrice" value="1000,10000" onClick={priceHandler}/> Above 1000</lable><br></br>
                <lable><input type="radio"  name="specialPrice" value="500,1000" onClick={priceHandler}/> 500-1000</lable><br></br>
                <lable><input type="radio"  name="specialPrice" value="1000,1200" onClick={priceHandler}/> 1000-1200</lable><br></br>
                <lable><input type="radio"  name="specialPrice" value="1200,1500" onClick={priceHandler}/> 1200-1500</lable><br></br>
                <lable><input type="radio"  name="specialPrice" value="1500,2000" onClick={priceHandler}/> 1500-2000</lable><br></br>
                <hr></hr>
                <h6><b>BRAND NAME</b></h6>
                <BrandFilter /><hr></hr>
            </div>
            <div className="col-lg-10">
            <h5 style={{display:"inline"}}><b>Sort By :</b></h5>
            <select onChange={sortHandler} style={{display:"inline", marginLeft:"20px", width:"150px", height:"28px", borderRadius:"7%", borderColor:"grey"}}>
                <option value="specialPrice">Price : low to high</option>
                <option value="-specialPrice">Price : high to low</option>
            </select>
            <br></br>
            <hr></hr>
                <Row>
                    
                    <GetProduct />
                    
                </Row>
            </div>

        </Row>
    </div>
    )
}


export default ProductList;