import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container, Row, CardColumns, Spinner, CardHeader, CardTitle, CardSubtitle,
  Card, Button, CardFooter, Form, ModalHeader, ModalBody, FormGroup, Label,
  Input, ModalFooter, Modal,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';
import ConfirmDelete from './ConfirmDelete';


const StudentList = ({
  setStudent, studentList, setStudentList, refreshStudents, setRefreshStudents,
}) => {
  const [studentToEdit, setStudentToEdit] = useState({});
  const [studentToDelete, setStudentToDelete] = useState({});
  // state to control loading spinner display
  const [isLoading, setIsLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    /* initial state of refreshStudents is true. Every time a page is refreshed, or
    refreshStudents is reset manually, the studentList will be re-populated */

    if (refreshStudents) {
      const id = localStorage.getItem('id');
      axiosWithAuth()
        .get(`/students/user/${id}`)
        .then((response) => {
          // sort the students by first name before rendering list
          response.data.sort((a, b) => {
            if (a.student_name.toUpperCase() < b.student_name.toUpperCase()) {
              return -1;
            }
            if (a.student_name.toUpperCase() > b.student_name.toUpperCase()) {
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

  const toggleEditModal = () => {
    setModal(!modal);
  };

  const toggleDeleteModal = () => {
    setDeleteItem(!deleteItem);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    toggleDeleteModal();
  };

  const handleClick = (student) => {
    setStudent(student);
  };

  const handleChange = (e) => {
    setStudentToEdit({
      ...studentToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (student) => {
    setStudentToEdit({
      student_name : student.student_name,
      major : student.major,
      id: student.id
    });
    toggleEditModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleEditModal();

    setStudentList(studentList
      .map((student) => {
        if (student.id === studentToEdit.id) {
          return { ...studentToEdit };
        }
        return student;
      }));

    axiosWithAuth()
      .put(`/students/${studentToEdit.id}`, studentToEdit)
      .then(() => {
        setStudentList(studentList.map(student=> {
          if(student.id === studentToEdit.id){
            return studentToEdit
          }
          return student
        }))
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
      <ConfirmDelete
        modal={deleteItem}
        toggleModal={toggleDeleteModal}
        item={studentToDelete.student_name}
        url={`students/${studentToDelete.id}`}
      />

      <Modal isOpen={modal} toggle={toggleEditModal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleEditModal}>Edit Student</ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="student_name"
                id="name"
                value={studentToEdit.student_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="major">major</Label>
              <Input
                type="text"
                name="major"
                id="major"
                value={studentToEdit.major}
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" color="primary">Save</Button>
            {' '}
            <Button type="button" color="secondary" onClick={toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Row>
        <Button color="success" onClick={() => window.location.href = '/studentform'}>Add</Button>
      </Row>

      {/* Display cards if results are returned from API call. Otherwise, indicate
       no results were returned */}
      {studentList.length > 0 && studentList[0] !== null ? (
        <Row>
          <CardColumns>
            {studentList.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <Link
                    to={`/students/${student.id}`}
                    value={student}
                    onClick={() => { handleClick(student); }}
                    onKeyPress={() => { handleClick(student); }}
                    role="link"
                    tabIndex="0"
                  >
                    <CardTitle tag="h2">{`${student.student_name}`}</CardTitle>
                  </Link>
                  <CardSubtitle><p>{student.major}</p></CardSubtitle>
                </CardHeader>

                <CardFooter>
                  <Button onClick={() => { handleEdit(student); }}>Edit</Button>
                  <Button color="danger" onClick={() => handleDelete(student)}>Delete</Button>
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
      id: PropTypes.number,
      student_name: PropTypes.string,
      major: PropTypes.string,
      user_id: PropTypes.number,
    }),
  ).isRequired,
  setStudentList: PropTypes.func.isRequired,
  refreshStudents: PropTypes.bool.isRequired,
  setRefreshStudents: PropTypes.func.isRequired,
};

export default StudentList;
