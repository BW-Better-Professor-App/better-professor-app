import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import StudentList from './components/StudentList';
import ProjectForm from './components/ProjectForm';
import SingleStudentPage from './components/SingleStudentPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  // using localstorage so student data is persistent on page refresh
  const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    });
    const setValue = (value) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    };
    return [storedValue, setValue];
  };
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
            <StudentList setStudent={setStudent} />
          )}
        />
        <PrivateRoute path="/projectform" component={ProjectForm} />
        <Route
          path="/students/:id"
          render={(props) => (
            <SingleStudentPage
              student={student}
              match={props.match}
            />
          )}
        />
      </div>
    </Router>

  );
}

App.propTypes = {
  match: PropTypes.string,
};

App.defaultProps = {
  match: '',
};

export default App;
