import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from 'reactstrap';

import { axiosWithAuth } from "./utils/axiosWithAuth";


const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axiosWithAuth
      .get(`/students`)
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {studentList.map((student) => (
          <Link key={student.id} to={`/students/${student.student_id}`}>
            <Card>
              <CardHeader>{`${student.firstname} ${student.lastname}`}</CardHeader>
              <CardBody>
                <p>{student.email}</p>
              </CardBody>
            </Card>
          </Link>
      ))}
    </>
  );
};


export default StudentList;
