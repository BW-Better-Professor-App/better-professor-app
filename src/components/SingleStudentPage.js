import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Container,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Form,
  FormGroup,
  Label,
  Input,
  Modal, 
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { axiosWithAuth } from './utils/axiosWithAuth';


const SingleStudentPage = ({ student }) => {
  const [modal, setModal] = useState(false);
  const [form , setForm] = useState({
    date: '',
    message: ''
  });
  const [allProjects, setAllProjects] = useState([])
  const [projectAdded, setProjectAdded] = useState({
    project_name: '',
    deadline: '',
    deadline_type: '',
    description: '',
    student_id: student.id
  })

const handleChange = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}
useEffect(()=>{
  axiosWithAuth()
  .get(`/projects/students/${student.id}`)
  .then(res=>{
    console.log(res)
    setAllProjects(res.data)
  })
},[setModal])
  
const handleSubmit = e => {
  e.preventDefault();
  // axiosWithAuth()
  // .post(`/professor-student-info/message/${student.id}`, form)
  // .then(res=>{
  //   console.log(res)
    
  // })
  // .catch(err=>{
  //   console.log(err)
  // })
  setForm({
      date: '',
      message: ''
    })
}

const toggleModal = () => {
  setModal(!modal);
};

const handleDelete = (id) => {
  axiosWithAuth()
  .delete(`/professor-student-info/${student.id}/projects/${id}`)
  .then(res=>{
    console.log(res)
  })
}

const handleAddProject = e => {
  setProjectAdded({
    ...projectAdded,
    [e.target.name] : e.target.value
  })
  console.log(projectAdded)
}

const handleSubmitProject = e => {
  axiosWithAuth()
  .post(`/projects`, projectAdded )
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
  toggleModal()
}

  return (
    <Container fluid>
      <Modal isOpen={modal} toggle={toggleModal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Add Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitProject}>
              <FormGroup>
                <Label>Select a Project</Label>
                <Input type='text' name='project_name' value={projectAdded.project_name} onChange={handleAddProject} placeholder='project name'/>
                <Input type='date' name='deadline' value={projectAdded.deadline} onChange={handleAddProject}/>
                <Input type='text' name='deadline_type' value={projectAdded.deadline_type} onChange={handleAddProject} placeholder='deadline type'/>
                <Input type='text' name='description' value={projectAdded.description} onChange={handleAddProject} placeholder='description'/>
              </FormGroup>
              <Button>Add This Project</Button>
            </Form>
          </ModalBody>
        </Form>
      </Modal>
    <Jumbotron>
      <h1>{`${student.student_name}`}</h1>
      <h3>{student.major}</h3>
    </Jumbotron>

    <Container>
      <ListGroup>
        <Button color="success" className="w-25 align-self-center" onClick={toggleModal}>Add Project</Button>
        {allProjects ? allProjects.map(project => (
          <Card key={`${project.id}`}>
            <CardHeader>
              <CardTitle tag="h2">{project.project_name}</CardTitle>
              
              <Button color="danger" onClick={()=>{handleDelete(project.id)}}>Delete</Button>
            </CardHeader>

            <CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <ListGroupItemHeading>Project Deadline</ListGroupItemHeading>
                  <ListGroupItemText>
                    {new Date(project.deadline).toLocaleString()}
                  </ListGroupItemText>
                  <ListGroupItemHeading>Deadline Type</ListGroupItemHeading>
                  <ListGroupItemText>{project.deadline_type===''?project.deadline_type : 'none'}</ListGroupItemText>
                  <ListGroupItemHeading>Description</ListGroupItemHeading>
                  <ListGroupItemText>{project.description===''?project.description:'none'}</ListGroupItemText>
                </ListGroupItem>
                
              </ListGroup>
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
            </CardBody>
          </Card>
        )) : <h2>No projects assigned</h2>}
      </ListGroup>
    </Container>
  </Container>
  )
  
};

SingleStudentPage.propTypes = {
  student: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    project: PropTypes.arrayOf(
      PropTypes.shape({
        project_id: PropTypes.number,
        project_name: PropTypes.string,
        project_deadline: PropTypes.date,
        feedback_deadline: PropTypes.date,
        recommendation_deadline: PropTypes.date,
        studentMessage: PropTypes.string,
        professorMessage: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default SingleStudentPage;
