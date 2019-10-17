import React, {useState} from 'react';
import axios from 'axios'
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

const Login = () => { 
    const [userData, setUserData] = useState({
        username:'',
        password: ''
    })

    const handleChange = e =>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        console.log(userData)
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`https://betterprofessor.herokuapp.com/api/login`)
        .then(res=>{
            console.log(res)
        })
    }
    return (
        <div className='Login-form'>
            <h2>Login Form</h2>
            <hr />
            <Form>
                <FormGroup>
                    <Label for='email'>Email:  </Label>
                    <Input type='email' name='username' id='email' placeholder='  email address' value={userData.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password:  </Label>
                    <Input type='password' name='password' id='password' placeholder='  password' value={userData.password} onChange={handleChange} />
                </FormGroup>
                <Button>Log In</Button>
            </Form>                
        </div>
    )
}

export default Login;