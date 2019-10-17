import React, { useState, useEffect } from 'react';
import { Container, Row, CardColumns } from 'reactstrap';

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

  return (
    <Container>
      <Row>
        <CardColumns>
          {isLoading ? <div>Loading students ...</div>
            : studentList.map((student) => (
              <SingleStudentPage key={student.id} student={student} />
            ))}
        </CardColumns>
      </Row>
    </Container>
  );
};


export default StudentList;
