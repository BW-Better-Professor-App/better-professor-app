import React from 'react';
import {Link} from 'react-router-dom'

const HomePage = props => {
    return (
        <div>
            <h1>Welcome to the Better Professor App!</h1>
            <p>The App that allows you to keep track of all the students you mentor so you can keep up with all their assignments!</p>
            <Link to='/login'>LogIn</Link>
            <Link to='/signup'>SignUp</Link>
        </div>
    )
}

export default HomePage;