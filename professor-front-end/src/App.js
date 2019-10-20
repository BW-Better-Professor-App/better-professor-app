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

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  /* studentList initialized to non-empty array with null value to indicate it has not
  yet been altered by the API call and a loading message should be displayed */
  const [studentList, setStudentList] = useState([null]);
  // state to control when the studentList should be refreshed to limit redundant API calls
  const [refresh, setRefresh] = useState(true);
  /* useLocalStorage allows the student to stay persistent after a browser refresh. Without
  * this, the student page would show "undefined" on a refresh because it would wipe out
  * state. */
  const [student, setStudent] = useLocalStorage('student', {});

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute
          path="/studentlist"
          component={() => (
            <>
              <NavBar />
              <StudentList
                studentList={studentList}
                setStudentList={setStudentList}
                setStudent={setStudent}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </>
          )}
        />
        <PrivateRoute
          path="/projectform"
          component={() => (
            <>
              <NavBar />
              <ProjectForm />
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
      </div>
    </Router>

  );
}

export default App;
