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
  const [projectAdded, setProjectAdded] = useState()

const handleChange = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}
useEffect(()=>{
  axiosWithAuth()
  .get('/projects')
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
  setProjectAdded(e.target.value)
}

const handleSubmitProject = e => {
  axiosWithAuth()
  .post(`/professor-student-info/${student.id}/projects`, projectAdded )
  .then(res=>{
    setProjectAdded();
  })
  .catch(err=>{
    setProjectAdded();
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
                <Input type='select' name='projects' onChange={handleAddProject}>
                  {allProjects.map(project => (
                    <option value={project.id} >{project.project_name}</option>
                  ))}
                </Input>
              </FormGroup>
              <Button>Add This Project</Button>
            </Form>
          </ModalBody>
        </Form>
      </Modal>
    <Jumbotron>
      <h1>{`${student.firstname} ${student.lastname}`}</h1>
      <p>{student.email}</p>
      <Button color="secondary">Edit</Button>
    </Jumbotron>

    <Container>
      <ListGroup>
        <Button color="success" className="w-25 align-self-center" onClick={toggleModal}>Add Project</Button>
        {student.project ? student.project.map(project => (
          <Card key={`${project.project_id}-${student.project.indexOf(project)}`}>
            <CardHeader>
              <CardTitle tag="h2">{project.project_name}</CardTitle>
              
              <Button color="danger" onClick={()=>{handleDelete(project.project_id)}}>Delete</Button>
            </CardHeader>

            <CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <ListGroupItemHeading>Project Deadline</ListGroupItemHeading>
                  <ListGroupItemText>
                    {new Date(project.project_deadline).toLocaleString()}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Feedback Deadline</ListGroupItemHeading>
                  <ListGroupItemText>
                    {new Date(project.feedback_deadline).toLocaleString()}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Recommendation Deadline</ListGroupItemHeading>
                  <ListGroupItemText>
                    {new Date(project.recommendation_deadline).toLocaleString()}
                  </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemHeading>Student Message</ListGroupItemHeading>
                  <ListGroupItemText>{project.studentMessage}</ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemHeading>Professor Message</ListGroupItemHeading>
                  <ListGroupItemText>{project.professorMessage}</ListGroupItemText>
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
