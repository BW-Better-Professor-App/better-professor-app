import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import StudentList from './components/StudentList';


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={HomePage}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/signup' component={SignUp}/>
        <PrivateRoute path='/studentlist' component={StudentList}/>
      </div>
    </Router>
    
  );
}

export default App;
