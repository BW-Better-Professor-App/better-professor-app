import React from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

const ProjectForm = () => {
    return (
        <div className='ProjectForm'>
            <h2>Add a Project</h2>
            <p>Enter the details of the project below to add.</p>
            <hr />
            <Form>
                <FormGroup>
                    <Label for='studentName'>Student Name </Label>
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

export default Login;