import React, { useState, useEffect } from 'react';
import {
  Card, CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';

import {axiosWithAuth} from "./utils/axiosWithAuth";


const SingleStudentPage = ({ match }) => {
  const [student, setStudent] = useState(undefined);
  const { id } = match.params;

  useEffect(() => {
    axiosWithAuth
      .get(`/students/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <h1>{`${student.firstname} ${student.lastname}`}</h1>
      <p>{student.email}</p>

      <h2>Projects</h2>
      <ListGroup>
        {student.projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.project_name}</CardTitle>
            </CardHeader>

            <CardBody>
              <ListGroup flush>
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
            </CardBody>
          </Card>
        ))}
      </ListGroup>
    </>
  )
};

export default SingleStudentPage;
