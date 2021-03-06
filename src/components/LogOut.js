import React from 'react';
import { Button } from 'reactstrap';


const LogOut = () => {
  const handleClick = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Button type="button" onClick={handleClick}>LogOut</Button>
  );
};

export default LogOut;
