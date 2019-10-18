import React, { useState, useEffect } from 'react';
import {
  Container, Row, CardColumns, Spinner,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';
import SingleStudentPage from './SingleStudentPage';


const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get('/professor-student-info')
      .then((response) => {
        setStudentList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <Container className="d-flex vh-100 justify-content-center">
        <Spinner className="align-self-center" style={{ width: '5rem', height: '5rem' }} color="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <CardColumns>
          {studentList.length > 0 ? studentList.map((student) => (
            <SingleStudentPage
              key={student.id}
              student={student}
            />
          ))
            : <div>No students are assigned.</div>}
        </CardColumns>
      </Row>
    </Container>
  );
};


export default StudentList;
