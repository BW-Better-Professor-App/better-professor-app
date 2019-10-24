import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

const SignUp = (props) => {
    const [user, setUser]= useState({
        username: '',
        password: '',
        first_name: '',
        last_name: ''
    })

    const handleChange = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(user)
        axios.post(`https://better-professor-backend.herokuapp.com/users/register`, user)
        .then(res=>{
            console.log(res)
            axios.post(`https://better-professor-backend.herokuapp.com/users/login`, user)
            .then(res=>{
                console.log(res.data.token)
                localStorage.setItem('token', res.data.token)
                props.history.push('/students')
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className='SignUp Page'>
            <h2>Create an Account</h2>
            <p>Sign up below to access all of our great features.</p>
            <hr />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='email'>Email:  </Label>
                    <Input type='email' name='username' id='email' placeholder='  email address' value={user.username} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password:  </Label>
                    <Input type='password' name='password' id='password' placeholder='  password' value={user.password} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='first_name'>First Name:  </Label>
                    <Input type='text' name='first_name' id='first_name' placeholder='  first name' value={user.first_name} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='last_name'>Last Name:  </Label>
                    <Input type='text' name='last_name' id='last_name' placeholder='  last Name' value={user.last_name} onChange={handleChange} />
                </FormGroup>
                <Button>Sign Up</Button>
            </Form>
        </div>
    )
}


export default SignUp;
