import React, {useState} from 'react';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import {axiosWithAuth} from './utils/axiosWithAuth';

const ProjectForm = () => {
    const [project, setProject] = useState({
        projectName: '',
        projectDeadline: '2019-12-18T19:55',
        feedbackDeadline: '2019-12-18T19:55',
        recommendationDeadline: '2019-12-18T19:55'
    })
    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: `${e.target.value}`
        })
        console.log(project)
        }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(project)
        axiosWithAuth()
        .post('/projects', project)
        .then(res=>{
            console.log(res)
            console.log(Date.now())
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div className='ProjectForm'>
            <h2>Add a Project</h2>
            <p>Enter the details of the project below to add.</p>
            <hr />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='project_name'>Project Name:  </Label>
                    <Input 
                        type='text' 
                        name='projectName' 
                        id='project_name' 
                        placeholder='  create project name' 
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='project_deadline'>Project Due by:</Label>
                    <Input
                        type='datetime-local'
                        name='projectDeadline'
                        id='project_deadline_date'
                        placeholder='date placeholder'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='feedback_deadline'>Feedback due by: </Label>
                    <Input
                        type='datetime-local'
                        name='feedbackDeadline'
                        id='feedback_deadline'
                        placeholder='date placeholder'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='recommendation_deadline'>recommendation due by: </Label>
                    <Input
                        type='datetime-local'
                        name='recommendationDeadline'
                        id='recommendation_deadline'
                        placeholder='date placeholder'
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type='submit'>Add Project</Button>
            </Form>                
        </div>
    )
}

export default ProjectForm;