import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Container, Jumbotron, ListGroup,
  ListGroupItem, ListGroupItemHeading, ListGroupItemText, Form, FormGroup, Label,
  Input, Modal, ModalHeader, ModalBody, Spinner,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';
import ConfirmDelete from './ConfirmDelete';


const SingleStudentPage = ({ student }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState({});
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    date: '',
    message: '',
  });
  const [allProjects, setAllProjects] = useState([null]);
  const [projectAdded, setProjectAdded] = useState({
    project_name: '',
    deadline: '',
    deadline_type: '',
    description: '',
    student_id: student.id,
  });

  const sortProjects = (projects) => {
    projects.sort((a, b) => {
      if (a.project_name.toUpperCase() < b.project_name.toUpperCase()) {
        return -1;
      }
      if (a.project_name.toUpperCase() > b.project_name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
    return projects;
  };

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/projects/students/${student.id}`)
      .then((res) => {
        setAllProjects(res.data);
      });
  }, [student.id]);

  useEffect(() => {
    if (allProjects.length === 0) {
      setIsLoading(false);
    } else if (allProjects.length > 0 && allProjects[0] !== null) {
      setIsLoading(false);
    }

    sortProjects(allProjects);
  }, [allProjects]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setForm({
      date: '',
      message: '',
    });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleDeleteModal = () => {
    setDeleteItem(!deleteItem);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
    toggleDeleteModal();
  };

  const handleAddProject = (e) => {
    setProjectAdded({
      ...projectAdded,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/projects', projectAdded)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setAllProjects(sortProjects([
      ...allProjects,
      projectAdded,
    ]));

    toggleModal();
  };

  // while the page is loading, render a spinner
  if (isLoading) {
    return (
      <Container className="d-flex vh-100 justify-content-center">
        <Spinner
          className="align-self-center"
          style={{ width: '5rem', height: '5rem' }}
          color="primary"
        />
      </Container>
    );
  }

  return (
    <Container fluid>
      <ConfirmDelete
        modal={deleteItem}
        toggleModal={toggleDeleteModal}
        item={projectToDelete.project_name}
        url={`projects/${projectToDelete.id}`}
      />

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Project</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitProject}>
            <FormGroup>
              <Label>Select a Project</Label>
              <Input type="text" name="project_name" value={projectAdded.project_name} onChange={handleAddProject} placeholder="project name" />
              <Input type="date" name="deadline" value={projectAdded.deadline} onChange={handleAddProject} />
              <Input type="text" name="deadline_type" value={projectAdded.deadline_type} onChange={handleAddProject} placeholder="deadline type" />
              <Input type="text" name="description" value={projectAdded.description} onChange={handleAddProject} placeholder="description" />
            </FormGroup>
            <Button>Add This Project</Button>
          </Form>
        </ModalBody>
      </Modal>
      <Jumbotron>
        <h1>{student.student_name}</h1>
        <h3>{student.major}</h3>
      </Jumbotron>

      <Container>
        <ListGroup>
          <Button
            color="success"
            className="w-25 align-self-center"
            onClick={toggleModal}
          >
            Add Project
          </Button>
          {allProjects.length > 0 && allProjects[0] !== null ? allProjects.map((project) => (
            <Card key={`${project.id}`}>
              <CardHeader>
                <CardTitle tag="h2">{project.project_name}</CardTitle>
                <Button color="danger" onClick={() => { handleDelete(project); }}>Delete</Button>
              </CardHeader>

              <CardBody>
                <ListGroup flush>
                  <ListGroupItem>
                    <ListGroupItemHeading>Project Deadline</ListGroupItemHeading>
                    <ListGroupItemText>
                      {new Date(project.deadline).toDateString()}
                    </ListGroupItemText>
                    <ListGroupItemHeading>Deadline Type</ListGroupItemHeading>
                    <ListGroupItemText>{project.deadline_type ? project.deadline_type : 'None'}</ListGroupItemText>
                    <ListGroupItemHeading>Description</ListGroupItemHeading>
                    <ListGroupItemText>{project.description ? project.description : 'None'}</ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>

                <div className="Message-form">
                  <h2>Message Form</h2>
                  <hr />
                  <Form className="message-form" onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="date">Date:  </Label>
                      <Input
                        className="message-area"
                        type="date"
                        name="date"
                        id="email"
                        value={form.date}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password:  </Label>
                      <textarea
                        className="message-area"
                        name="message"
                        id="password"
                        placeholder="  message"
                        value={form.message}
                        onChange={handleChange}
                      />
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
  );
};

SingleStudentPage.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    student_name: PropTypes.string.isRequired,
    major: PropTypes.string,
    project: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        project_name: PropTypes.string,
        description: PropTypes.string,
        deadline: PropTypes.date,
        deadline_type: PropTypes.date,
        studentMessage: PropTypes.string,
        professorMessage: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default SingleStudentPage;
