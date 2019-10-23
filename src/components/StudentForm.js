import React, {useState} from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import {axiosWithAuth} from './utils/axiosWithAuth';

const StudentForm = ({setStudentList, studentList}) => {
    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
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
            console.log(studentList)
            console.log(res)
            // axiosWithAuth()
            // .post(`/professor-student-info/students`, student)
            // .then(res=>{
            //     console.log(res)
            // })
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
                    <Label for='firstname'>First Name:  </Label>
                    <Input 
                        type='text' 
                        name='firstname' 
                        id='firstname' 
                        placeholder='  first name  '
                        required 
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='last_name'>Last Name:</Label>
                    <Input
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='  last name '
                        required
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='email'>Email Address: </Label>
                    <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='  email address '
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
