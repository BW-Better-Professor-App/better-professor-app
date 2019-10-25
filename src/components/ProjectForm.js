import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Label, Input, FormGroup, Container,
} from 'reactstrap';

import { axiosWithAuth } from './utils/axiosWithAuth';


const ProjectForm = ({ studentList }) => {
  const [project, setProject] = useState({
    assignedStudents: [0],
    name: '',
    deadline: '',
    deadlineType: '',
    description: '',
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'assignedStudents') {
      const { options } = e.target;
      const value = [];
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].selected) {
          value.push(Number(options[i].value));
        }
      }
      setProject({
        ...project,
        assignedStudents: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    project.assignedStudents.forEach((assignedStudent) => {
      axiosWithAuth()
        .post('/projects', {
          project_name: project.name,
          deadline: project.deadline,
          deadline_type: project.deadlineType,
          description: project.description,
          student_id: assignedStudent,
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    });
  };

  if (studentList[0] !== null) {
    return (
      <Container className="ProjectForm">
        <h2>Add a Project</h2>
        <p>Enter the details of the project below to add.</p>
        <hr />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Project Name: </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Project name"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Project Description: </Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Description"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="deadline">Project Due By: </Label>
            <Input
              type="date"
              name="deadline"
              id="deadline"
              placeholder="date"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="deadlineType">Deadline Type: </Label>
            <Input
              type="text"
              name="deadlineType"
              id="deadlineType"
              placeholder="Deadline type"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="assignedStudents">Assigned Students: </Label>
            <Input
              type="select"
              name="assignedStudents"
              id="assignedStudents"
              onChange={handleChange}
              multiple
            >
              {studentList.sort((a, b) => {
                if (a.student_name.toUpperCase() < b.student_name.toUpperCase()) { return -1; }
                if (a.student_name.toUpperCase() > b.student_name.toUpperCase()) { return 1; }
                return 0;
              }).map((student) => (
                <option key={student.id} value={student.id}>{student.student_name}</option>
              ))}
            </Input>
          </FormGroup>
          <Button type="submit">Add Project</Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Please add a student before assigning a project.</h1>
    </Container>
  );
};

ProjectForm.propTypes = {
  studentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      student_name: PropTypes.string.isRequired,
      major: PropTypes.string,
    }),
  ),
};

ProjectForm.defaultProps = {
  studentList: [
    {
      major: '',
    },
  ],
};

export default ProjectForm;
