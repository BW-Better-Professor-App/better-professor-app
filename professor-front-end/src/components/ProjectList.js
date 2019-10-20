import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container,
  Form, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText, Modal, ModalBody, ModalFooter, ModalHeader, Spinner,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get('/projects')
      .then((response) => {
        response.data.sort((a, b) => {
          if (a.project_name.toUpperCase() < b.project_name.toUpperCase()) {
            return -1;
          }
          if (a.project_name.toUpperCase() > b.project_name.toUpperCase()) {
            return 1;
          }
          return 0;
        });

        setProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  }, []);

  const toggleAlert = useCallback(() => {
    setAlert(!alert);
  }, [alert]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        toggleAlert();
      }, 3000);
    }
  }, [alert, toggleAlert]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleClick = (project) => {
    setProjectToEdit(project);
    toggleModal();
  };

  const handleChange = (e) => {
    setProjectToEdit({
      ...projectToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModal();

    setProjectList(projectList
      .map((project) => {
        if (project.id === projectToEdit.id) {
          return { ...projectToEdit };
        }
        return project;
      })
      .sort((a, b) => {
        if (a.project_name.toUpperCase() < b.project_name.toUpperCase()) {
          return -1;
        }
        if (a.project_name.toUpperCase() > b.project_name.toUpperCase()) {
          return 1;
        }
        return 0;
      }));

    axiosWithAuth()
      .put(`/projects/${projectToEdit.id}`, {
        id: projectToEdit.id,
        projectName: projectToEdit.project_name,
        projectDeadline: new Date(projectToEdit.project_deadline).toUTCString(),
        feedbackDeadline: new Date(projectToEdit.feedback_deadline).toUTCString(),
        recommendationDeadline: new Date(projectToEdit.recommendation_deadline).toUTCString(),
      })
      .then((response) => {
        console.log(response);
        toggleAlert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toLocaleISOString = (date) => {
    function pad(n) { return (`0${n}`).substr(-2); }

    const day = [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-');
    let time = [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');

    if (date.getMilliseconds()) {
      time += `.${date.getMilliseconds()}`;
    }

    return `${day}T${time}`;
  };

  const dateDisplayOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

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
    <Container className="vh-100 justify-content-center">
      <Alert color="success" isOpen={alert} toggle={toggleAlert}>
        Changes saved!
      </Alert>

      <Modal isOpen={modal} toggle={toggleModal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Edit Project</ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label for="project_name">Project Name</Label>
              <Input
                type="text"
                name="project_name"
                id="project_name"
                value={projectToEdit.project_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="project_deadline">Project Deadline</Label>
              <Input
                type="datetime-local"
                name="project_deadline"
                id="project_deadline"
                defaultValue={projectToEdit.project_deadline
                  ? toLocaleISOString(new Date(projectToEdit.project_deadline))
                  : projectToEdit.project_deadline}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="feedback_deadline">Feedback Deadline</Label>
              <Input
                type="datetime-local"
                name="feedback_deadline"
                id="feedback_deadline"
                defaultValue={projectToEdit.feedback_deadline
                  ? projectToEdit.feedback_deadline.slice(0, -5)
                  : projectToEdit.feedback_deadline}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="recommendation_deadline">Recommendation Deadline</Label>
              <Input
                type="datetime-local"
                name="recommendation_deadline"
                id="recommendation_deadline"
                defaultValue={projectToEdit.recommendation_deadline
                  ? projectToEdit.recommendation_deadline.slice(0, -5)
                  : projectToEdit.recommendation_deadline}
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" color="primary">Save</Button>
            {' '}
            <Button type="button" color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {projectList.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle tag="h2">{project.project_name}</CardTitle>
          </CardHeader>

          <CardBody>
            <ListGroup flush>
              <ListGroupItem>
                <ListGroupItemHeading>Project Deadline</ListGroupItemHeading>
                <ListGroupItemText>
                  {new Date(project.project_deadline).toLocaleString([], dateDisplayOptions)}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>Feedback Deadline</ListGroupItemHeading>
                <ListGroupItemText>
                  {new Date(project.feedback_deadline).toLocaleString([], dateDisplayOptions)}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>Recommendation Deadline</ListGroupItemHeading>
                <ListGroupItemText>
                  {new Date(project.recommendation_deadline).toLocaleString([], dateDisplayOptions)}
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
          </CardBody>

          <CardFooter>
            <Button onClick={() => { handleClick(project); }}>Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </Container>
  );
};

export default ProjectList;
