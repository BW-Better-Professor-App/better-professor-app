import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  CardColumns,
  Spinner,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  ListGroup,
  ListGroupItem, Card, Button, CardFooter,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const StudentList = ({ setStudent }) => {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosWithAuth()
      .get('/professor-student-info')
      .then((response) => {
        // sort the students by first name
        response.data.sort((a, b) => {
          if (a.firstname < b.firstname) { return -1; }
          if (a.firstname > b.firstname) { return 1; }
          return 0;
        });
        setStudentList(response.data);
        // once studentlist is sorted and set, replace spinner with list
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (student) => {
    setStudent(student);
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
      <Row>
        <Button color="success">Add</Button>
      </Row>

      {studentList.length > 0 ? (
        <Row>
          <CardColumns>
            {studentList.map((student) => (
              <Card key={student.student_id}>
                <CardHeader>
                  <Link
                    to={`/students/${student.student_id}`}
                    value={student}
                    onClick={() => { handleClick(student); }}
                    onKeyPress={() => { handleClick(student); }}
                  >
                    <CardTitle tag="h2">{`${student.firstname} ${student.lastname}`}</CardTitle>
                  </Link>
                  <CardSubtitle><p>{student.email}</p></CardSubtitle>
                </CardHeader>

                <CardBody>
                  <h3>Projects</h3>
                  <ListGroup flush>
                    {student.project ? student.project.map((project) => (
                      <ListGroupItem key={`${student.student_id}-${project.project_id}`}>
                        <h4>{project.project_name}</h4>
                      </ListGroupItem>
                    )) : <p>No projects assigned</p>}
                  </ListGroup>
                </CardBody>

                <CardFooter>
                  <Button color="danger">Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </CardColumns>
        </Row>
      ) : <h2 className="align-self-center">No students are assigned.</h2>}

    </Container>
  );
};

StudentList.propTypes = {
  setStudent: PropTypes.func.isRequired,
};


export default StudentList;
