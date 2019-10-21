import React, {useState} from 'react';
import {axiosWithAuth} from './utils/axiosWithAuth';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

const MessageForm = () => {
    const [form , setForm] = useState({
        date: '',
        message: ''
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {

    }

    return (
        <div className='Message-form'>
            <h2>Message Form</h2>
            <hr />
            <Form className='message-form'onSubmit={handleSubmit}>
                <FormGroup >
                    <Label for='date'>Date:  </Label>
                    <Input className='message-area' type='date' name='date' id='email' value={form.date} onChange={handleChange} />
                </FormGroup>
                <FormGroup >
                    <Label for='password'>Password:  </Label>
                    <textarea className='message-area' name='message' id='password' placeholder='  message' value={form.message} onChange={handleChange} />
                </FormGroup>
                <Button>Send Message</Button>
            </Form>
        </div>
    )
}

export default MessageForm;