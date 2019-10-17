import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import StudentList from './components/StudentList';


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={HomePage}/>
<<<<<<< HEAD
        <Login />
=======
        <Route path='/login' component={LogIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/studentlist' component={StudentList}/>
>>>>>>> 56bd282349a553d4b8909f5d1e2ac14b5637f5f6
      </div>
    </Router>
    
  );
}

export default App;
