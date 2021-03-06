import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import NavBar from './NavBar'

const HomePage = () => (
  <div>
    < NavBar />
    <div className='home_page'>
      <h1>Welcome to the Better Professor App!</h1>
      <p>
        The App that allows you to keep track of all the students you mentor so you can
        keep up with all their assignments!
      </p>

      <Link to="/login">
        <Button type="button">LogIn</Button>
      </Link>
      <Link to="/signup">
        <Button type="button">SignUp</Button>
      </Link>
    </div>
  </div>
);

export default HomePage;
