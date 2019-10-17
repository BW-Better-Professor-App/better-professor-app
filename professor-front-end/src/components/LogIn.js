import React from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

const Login = () => {
    return (
        <div className='Login-form'>
            <h2>Login Form</h2>
            <hr />
            <Form>
                <FormGroup>
                    <Label for='email'>Email:  </Label>
                    <Input type='email' name='email' id='email' placeholder='  email address' />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password:  </Label>
                    <Input type='password' name='password' id='password' placeholder='  password' />
                </FormGroup>
                <Button>Submit</Button>
            </Form>                
        </div>
    )
}

export default Login;