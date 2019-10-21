import React, {useState} from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import {axiosWithAuth} from './utils/axiosWithAuth';

const StudentForm = () => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        })

    const handleChange = e => {
        setStudent({
            ...student,
            [e.target.name]: `${e.target.value}`
        })
        console.log(student)
        }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(student)
        axiosWithAuth()
        .post('/students', student)
        .then(res=>{
            console.log(res)
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div className='studentForm'>
            <h2>Add a Student</h2>
            <p>Enter the student's information below.</p>
            <hr />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='first_name'>First Name:  </Label>
                    <Input 
                        type='text' 
                        name='studentName' 
                        id='student_name' 
                        placeholder='  first name  '
                        required 
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='last_name'>Last Name:</Label>
                    <Input
                        type='text'
                        name='lastName'
                        id='last_name'
                        placeholder='  last name '
                        required
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='student_email'>Feedback due by: </Label>
                    <Input
                        type='email'
                        name='feedbackDeadline'
                        id='feedback_deadline'
                        placeholder='date placeholder'
                        required
                        onChange={handleChange}
                    />
                </FormGroup>
                <p>Projects may be added from the student information page.</p>
                <Button type='submit'>Add Student</Button>
            </Form>                
        </div>
    )
}

export default StudentForm;
