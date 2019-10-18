import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import StudentList from './components/StudentList';
import ProjectForm from './components/ProjectForm';


function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={HomePage}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/signup' component={SignUp}/>
        <PrivateRoute path='/studentlist' component={StudentList}/>
        <PrivateRoute path='/projectform' component={ProjectForm}/>
      </div>
    </Router>

  );
}

export default App;
