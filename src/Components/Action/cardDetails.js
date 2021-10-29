import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Button, Label} from 'reactstrap';
import { loginUser } from './action';
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Header.css";


class CardDetails extends Component{
      
  
  render(){
    
      return(
        
              <Form method="POST">
                {/* <Label className="form-lable">Phone No</Label> */}
                <input type="text" className="form-input"  name="name" placeholder="Card Holder Name" required="required" />
                {/* <Label className="form-lable">Password</Label> */}
                <input type="number" max="16" min="16" className="form-input" name="number" placeholder="Card number" required="required" />
                <input type="date" className="form-input" name="exdate" placeholder="Expire Date" required="required" />
                <input type="number" max="3" min="3" className="form-input" name="cvv" placeholder="CVV" />
                <hr></hr>
                {/* <Button type="submit" className="form-sbutton">Pay Now</Button> */}
              </Form>

        
                  
      )
  }
}

export default CardDetails
