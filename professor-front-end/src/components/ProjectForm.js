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
                    <Label for='project_id'>Project ID#: </Label>
                    <Input 
                        type='text' 
                        name='id' 
                        id='project_id' 
                        placeholder='  create project id' 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='project_name'>Project Name:  </Label>
                    <Input 
                        type='text' 
                        name='projectName' 
                        id='project_name' 
                        placeholder='  create project name' 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='project_deadline'>Project Due by:</Label>
                    <Input
                        type='date'
                        name='project_deadline'
                        id='project_deadline_date'
                        placeholder='date placeholder'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='feedback_deadline'>Feedback due by: </Label>
                    <Input
                        type='date'
                        name='feedback_deadline'
                        id='feedback_deadline'
                        placeholder='date placeholder'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='professor_message'>Professor Notes:  </Label>
                    <Input 
                        type='textarea' 
                        name='professor_message' 
                        id='professor_message' 
                        placeholder=' enter relevant notes here' 
                    />
                </FormGroup>
                <Button>Add Project</Button>
            </Form>                
        </div>
    )
}

export default ProjectForm;