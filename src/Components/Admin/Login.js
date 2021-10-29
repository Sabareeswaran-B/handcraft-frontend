import React, { Component, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Button, Label, Container} from 'reactstrap';
import { loginAdmin } from '../Action/action';
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Header.css";


function Login (props) {
      
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");


    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const user = {
          phone: phone,
          password: password,
      }
      if(!user.phone){toast("Enter the phone number")}
      if(!user.password){toast("Enter the Password")}
      loginAdmin(user);
      props.history.push("/admin/home")
      
    }
      return(
        <Container style={{padding:"80px", backgroundColor:"lavender",width:"50%"}}>
        
              <Form>
                <h4 style={{textAlign:"center"}}>Admin Login</h4>
                <Label className="form-lable">Phone No</Label>
                <Input type="tel" className="form-input"  name="phone" placeholder="Enter your Phone number" required="required"  onChange={ handlePhone } value={ phone } />
                <Label className="form-lable">Password</Label>
                <Input type="password" className="form-input" name="password" placeholder="Enter the password" required="required" onChange={ handlePassword } value={ password } />
                <hr></hr>
                <a href="/admin/home"><Button type="submit" className="form-sbutton"  onClick ={ handleSubmit }>Submit</Button></a>
              </Form>

        </Container>

        
                  
      )
}

export default Login
