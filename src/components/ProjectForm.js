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
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <Container className="ProjectForm">
      <h2>Add a Project</h2>
      <p>Enter the details of the project below to add.</p>
      <hr />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Project Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Project name"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Project Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="deadline">Project Due By</Label>
          <Input
            type="date"
            name="deadline"
            id="deadline"
            placeholder="date"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="deadlineType">Deadline Type</Label>
          <Input
            type="select"
            name="deadlineType"
            id="deadlineType"
            onChange={handleChange}
          >
            <option value="Research Paper">Research Paper</option>
            <option value="Test">Test</option>
            <option value="Group Assignment">Group Assignment</option>
            <option value="Thesis">Thesis</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="assignedStudents">Assigned Students</Label>
          <Input
            type="select"
            name="assignedStudents"
            id="assignedStudents"
            onChange={handleChange}
            multiple
          >
            {studentList.sort((a, b) => {
              if (a.student < b.student) { return -1; }
              if (a.student > b.student) { return 1; }
              return 0;
            }).map((student) => (
              <option key={student.id} value={student.id}>{student.student}</option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit">Add Project</Button>
      </Form>
    </Container>
  );
};

ProjectForm.propTypes = {
  studentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      student: PropTypes.string.isRequired,
      major: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProjectForm;
