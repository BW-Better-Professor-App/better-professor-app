import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container, Row, CardColumns, Spinner, CardHeader, CardTitle, CardSubtitle,
  CardBody, ListGroup, ListGroupItem, Card, Button, CardFooter, Form, ModalHeader,
  ModalBody, FormGroup, Label, Input, ModalFooter, Modal,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const StudentList = ({
  setStudent, studentList, setStudentList, refreshStudents, setRefreshStudents,
}) => {
  const [studentToEdit, setStudentToEdit] = useState({});
  // state to control loading spinner display
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    /* initial state of refreshStudents is true. Every time a page is refreshed, or
    refreshStudents is reset manually, the studentList will be re-populated */

    if (refreshStudents) {
      axiosWithAuth()
        .get('/professor-student-info')
        .then((response) => {
          // sort the students by first name before rendering list
          response.data.sort((a, b) => {
            if (a.firstname < b.firstname) {
              return -1;
            }
            if (a.firstname > b.firstname) {
              return 1;
            }
            return 0;
          });

          setStudentList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /* Because the initial state of studentList is a non-empty array with a null value,
    we know the API has been called when it's shape has changed. length === 0 means no
    results. Length > 0 but with non-null values means we have results.
    Redundant if/else/if is a little easier to read than mixing && || operators */
    if (studentList.length === 0) {
      setIsLoading(false);
    } else if (studentList.length > 0 && studentList[0] !== null) {
      setIsLoading(false);
    }

    /* Prevent another API call from being made until refreshStudents is true again. This happens
    automatically when a page is refreshed, or state is set manually. */
    setRefreshStudents(false);
  }, [refreshStudents, setRefreshStudents, setStudentList, studentList]);

  const handleDelete = (id) => {
    axiosWithAuth()

      .delete(`students/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);

    // refresh studentList
    setRefreshStudents(true);
  };

  const handleClick = (student) => {
    setStudent(student);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    setStudentToEdit({
      ...studentToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
    toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModal();

    setStudentList(studentList
      .map((student) => {
        if (student.student_id === studentToEdit.student_id) {
          return { ...studentToEdit };
        }
        return student;
      })
      .sort((a, b) => {
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1;
        }
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
          return 1;
        }
        return 0;
      }));

    axiosWithAuth()
      .put(`/students/${studentToEdit.student_id}`, studentToEdit)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <Container className="vh-100 justify-content-center">
      <Modal isOpen={modal} toggle={toggleModal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Edit Student</ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={studentToEdit.firstname}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={studentToEdit.lastname}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={studentToEdit.email}
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

      <Row>
        <Button color="success">Add</Button>
      </Row>

      {/* Display cards if results are returned from API call. Otherwise, indicate
       no results were returned */}
      {studentList.length > 0 && studentList[0] !== null ? (
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
                    role="link"
                    tabIndex="0"
                  >
                    <CardTitle tag="h2">{`${student.firstname} ${student.lastname}`}</CardTitle>
                  </Link>
                  <CardSubtitle><p>{student.email}</p></CardSubtitle>
                </CardHeader>

                <CardBody>
                  <h3>Projects</h3>
                  <ListGroup flush>
                    {student.project ? student.project.map((project) => (
                      <ListGroupItem
                        key={`${student.student_id}-${project.project_id}-${student.project.indexOf(project)}`}
                      >
                        <h4>{project.project_name}</h4>
                      </ListGroupItem>
                    )) : <p>No projects assigned</p>}
                  </ListGroup>
                </CardBody>

                <CardFooter>
                  <Button onClick={() => { handleEdit(student); }}>Edit</Button>
                  <Button color="danger" onClick={() => handleDelete(student.student_id)}>Delete</Button>
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
  studentList: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
  setStudentList: PropTypes.func.isRequired,
  refreshStudents: PropTypes.bool.isRequired,
  setRefreshStudents: PropTypes.func.isRequired,
};

export default StudentList;
