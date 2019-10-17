import React, { useState, useEffect } from 'react';
import { Container, Row, CardColumns } from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';
import SingleStudentPage from './SingleStudentPage';


const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/professor-student-info')
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <CardColumns>
          {studentList.map((student) => (
            <SingleStudentPage key={student.id} student={student} />
          ))}
        </CardColumns>
      </Row>
    </Container>
  );
};


export default StudentList;
