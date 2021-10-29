import React, { Component } from 'react';
import { Row } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../CSS/Gallery.css';


class Gallery extends Component{
    constructor() {
    super();
    this.state = {
        imgs: []
    };
    }
        
    componentDidMount() {
    fetch('http://localhost:9000/gridImage')
    .then(res => res.json())
    .then(imgs => this.setState({ imgs }));
    }
    render(){
        
        const Card = (props) => {
            return(
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="card" style={ {height : `${props.height}`} }>
                        <a href={props.href}><img className="card-img-overlay" src={props.src} alt = "Gallery-Images"/>
                        </a>
                    </div>
                </div>
            )
        }
        const Grid = (props) => {
            // console.log(props)
            return props.array.map(data => {
                return(
                <Card href={data.path} src={data.image} height={props.height}/>
                )
            })
        }
        return(
            <div className='container-fluid'>
                <div className="gallery">

                    <div className="container-fluid">    
                        <h3 >CELEBRATE A HERITAGE</h3>
                        <Row>
                        <Grid array = {this.state.imgs} height = "360px"/>
                        </Row>
                        
                        

                        
                    </div>
                </div>
            </div>
        )
    } 
}

export default Gallery;