import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import useLocalStorage from './components/hooks/localStorage';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import StudentList from './components/StudentList';
import ProjectForm from './components/ProjectForm';
import SingleStudentPage from './components/SingleStudentPage';
import MessageForm from './components/MessageForm';
import StudentForm from './components/StudentForm';

import './styles/main.scss';
import './App.css';
import ProjectList from './components/ProjectList';


function App() {
  /* studentList initialized to non-empty array with null value to indicate it has not
  yet been altered by the API call and a loading message should be displayed */
  const [studentList, setStudentList] = useState([null]);
  const [projectList, setProjectList] = useState([]);
  // state to control when the studentList should be refreshed to limit redundant API calls
  const [refreshStudents, setRefreshStudents] = useState(true);
  const [refreshProjects, setRefreshProjects] = useState(true);
  /* useLocalStorage allows the student to stay persistent after a browser refreshStudents. Without
  * this, the student page would show "undefined" on a refreshStudents because it would wipe out
  * state. */
  const [student, setStudent] = useLocalStorage('student', {});

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/message" component={MessageForm} />
        <PrivateRoute
          exact
          path="/students"
          component={() => (
            <>
              <NavBar />
              <StudentList
                studentList={studentList}
                setStudentList={setStudentList}
                setStudent={setStudent}
                refreshStudents={refreshStudents}
                setRefreshStudents={setRefreshStudents}
              />
            </>
          )}
        />
        <PrivateRoute
          path="/students/:id"
          component={() => (
            <>
              <NavBar />
              <SingleStudentPage
                student={student}
              />
            </>
          )}
        />

        <PrivateRoute
          exact
          path="/projects"
          component={() => (
            <>
              <NavBar />
              <ProjectList
                projectList={projectList}
                setProjectList={setProjectList}
                refreshProjects={refreshProjects}
                setRefreshProjects={setRefreshProjects}
              />
            </>
          )}
        />

        <PrivateRoute
          path="/projectform"
          component={() => (
            <>
              <NavBar />
              <ProjectForm
                setRefreshProjects={setRefreshProjects}
              />
            </>
          )}
        />

        <PrivateRoute
          path="/studentform"
          component={() => (
            <>
              <NavBar />
              <StudentForm
              studentList={studentList}
              setStudentList={setStudentList}
              />
            </>
          )}
        />
      </div>
    </Router>

  );
}

export default App;
