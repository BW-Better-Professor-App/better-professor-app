import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody,
  CardHeader, CardSubtitle,
  CardTitle, Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';


const SingleStudentPage = ({ student }) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h2">{`${student.firstname} ${student.lastname}`}</CardTitle>
      <CardSubtitle><p>{student.email}</p></CardSubtitle>
    </CardHeader>
    <CardBody>
      <h3>Projects</h3>
      {student.projects ? student.projects.map((project) => (
        <Container key={project.id}>
          <ListGroup>
            <h4>{project.project_name}</h4>
            <ListGroupItem>
              <ListGroupItemHeading>Project Deadline</ListGroupItemHeading>
              <ListGroupItemText>{project.project_deadline}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Feedback Deadline</ListGroupItemHeading>
              <ListGroupItemText>{project.feedback_deadline}</ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
              <ListGroupItemHeading>Recommendation Deadline</ListGroupItemHeading>
              <ListGroupItemText>{project.recommendation_deadline}</ListGroupItemText>
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
        </Container>
      )) : <p>No projects assigned</p>}
    </CardBody>
  </Card>
);

SingleStudentPage.propTypes = {
  student: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
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
