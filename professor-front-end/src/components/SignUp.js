import React from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

const SignUp = () => {
    return (
        <div className='SignUp Page'>
            <h2>Create an Account</h2>
            <p>Sign up below to access all of our great features.</p>
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
                <Button>Sign Up</Button>
            </Form>                
        </div>
    )
}

export default SignUp;