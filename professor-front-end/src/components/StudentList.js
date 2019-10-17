import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CardColumns, Card, CardHeader, CardBody,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/students')
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CardColumns>
      {studentList.map((student) => (
        <Link key={student.id} to={`/students/${student.id}`}>
          <Card>
            <CardHeader>{`${student.firstname} ${student.lastname}`}</CardHeader>
            <CardBody>
              <p>{student.email}</p>
              {console.log(student)}
            </CardBody>
          </Card>
        </Link>
      ))}
    </CardColumns>
  );
};


export default StudentList;
