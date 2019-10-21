import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Container,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';


const SingleStudentPage = ({ student }) => (
  <Container fluid>
    <Jumbotron>
      <h1>{`${student.firstname} ${student.lastname}`}</h1>
      <p>{student.email}</p>
      <Button color="secondary">Edit</Button>
    </Jumbotron>

    <Container>
      <ListGroup>
        <Button color="success" className="w-25 align-self-center">Add</Button>
        {student.project ? student.project.map((project) => (
          <Card key={`${project.project_id}-${student.project.indexOf(project)}`}>
            <CardHeader>
              <CardTitle tag="h2">{project.project_name}</CardTitle>
              <Button color="secondary">Edit</Button>
              <Button color="danger">Delete</Button>
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
            </CardBody>
          </Card>
        )) : <h2>No projects assigned</h2>}
      </ListGroup>
    </Container>
  </Container>
);

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
