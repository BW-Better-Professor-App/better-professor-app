import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardColumns, CardFooter, CardHeader, CardTitle, Container,
  Form, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText, Modal, ModalBody, ModalFooter, ModalHeader, Spinner,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const ProjectList = ({
  projectList, setProjectList, refreshProjects, setRefreshProjects,
}) => {
  const [projectToEdit, setProjectToEdit] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    /* initial state of refreshProjects is true. Every time a page is refreshed, or
     refreshProjects is reset manually, the studentList will be re-populated */

    if (refreshProjects) {
      axiosWithAuth()
        .get('/projects')
        .then((response) => {
          // sort the projects by name before rendering
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
    }

    if (projectList.length > 0) {
      setIsLoading(false);
    }

    /* Prevent another API call from being made until refreshProjects is true again. This happens
     automatically when a page is refreshed, or state is set manually. */
    setRefreshProjects(false);
  }, [projectList.length, refreshProjects, setProjectList, setRefreshProjects]);

  const toggleModal = () => {
    setModal(!modal);
  };

  // set the project to be edited and open the editing panel
  const handleEdit = (project) => {
    setProjectToEdit(project);
    toggleModal();
  };

  const handleDelete = (project) => {
    axiosWithAuth()
      .delete(`/projects/${project.id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // refresh projectList
    setRefreshProjects(true);
  };

  const handleChange = (e) => {
    setProjectToEdit({
      ...projectToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // close editing panel
    toggleModal();

    /* add project to projectList so we don't have to perform another GET request
    to see changes */
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
        /* Server will only accept keys in camelCase even though it provides them with
        * underscores */
        projectName: projectToEdit.project_name,
        /* Dates received from server are in ISOString format. We need to convert the
        * date to a UTCString to store it in a locale-agnostic format. */
        projectDeadline: new Date(projectToEdit.project_deadline).toUTCString(),
        feedbackDeadline: new Date(projectToEdit.feedback_deadline).toUTCString(),
        recommendationDeadline: new Date(projectToEdit.recommendation_deadline).toUTCString(),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* The server provides us with dates in an ISOString but we need to convert it to
  * the user's timezone before display. */
  const toLocaleISOString = (date) => {
    function pad(n) { return (`0${n}`).substr(-2); }

    const day = [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-');
    let time = [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');

    if (date.getMilliseconds()) {
      time += `.${date.getMilliseconds()}`;
    }

    return `${day}T${time}`;
  };

  /* By default, toLocaleString includes seconds, which we do not want to display. Using
  * these configuration options will remove them. */
  const dateDisplayOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  if (isLoading) {
    return (
      <Container tag="main" className="d-flex vh-100 justify-content-center">
        <Spinner
          className="align-self-center"
          style={{ width: '5rem', height: '5rem' }}
          color="primary"
        />
      </Container>
    );
  }

  return (
    <Container tag="main" className="vh-100 justify-content-center">
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
                // {/* If there is a date, we must use our toLocaleISOString function to
                //  * convert it to the user's timezone and slice off the seconds.
                //  * defaultValue is required in place of value to prepopulate the date
                //  * in the edit field. */}
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
                  ? toLocaleISOString(new Date(projectToEdit.feedback_deadline))
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
                  ? toLocaleISOString(new Date(projectToEdit.recommendation_deadline))
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

      <CardColumns>
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
                    {/* Because the date is stored as a UTCString on the server, we must
                    * convert it to a localeString so the timezone matches our user's. */}
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
              <Button onClick={() => { handleEdit(project); }}>Edit</Button>
              <Button onClick={() => { handleDelete(project); }} color="danger">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </CardColumns>
    </Container>
  );
};

ProjectList.propTypes = {
  projectList: PropTypes.arrayOf(
    PropTypes.shape({
      project_id: PropTypes.number,
      project_name: PropTypes.string,
      project_deadline: PropTypes.date,
      feedback_deadline: PropTypes.date,
      recommendation_deadline: PropTypes.date,
      studentMessage: PropTypes.string,
      professorMessage: PropTypes.string,
    }),
  ).isRequired,
  setProjectList: PropTypes.func.isRequired,
  refreshProjects: PropTypes.bool.isRequired,
  setRefreshProjects: PropTypes.func.isRequired,
};

export default ProjectList;
