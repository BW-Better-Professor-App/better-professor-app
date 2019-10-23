import React, {useState} from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import {axiosWithAuth} from './utils/axiosWithAuth';

const StudentForm = ({setStudentList, studentList}) => {
    const idString = localStorage.getItem('id')
    const userId = parseInt(idString)
    
    const [student, setStudent] = useState({
        student_name: '',
        major: '',
        user_id: userId
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
        .post(`/students`, student)
        .then(res=>{
            console.log(studentList)
            console.log(res)
            window.location.href = '/students'
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
                    <Label for='name'>Name:  </Label>
                    <Input 
                        type='text' 
                        name='student_name' 
                        id='name' 
                        placeholder='  name  '
                        required 
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='major'>major:</Label>
                    <Input
                        type='text'
                        name='major'
                        id='major'
                        placeholder='  major '
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
