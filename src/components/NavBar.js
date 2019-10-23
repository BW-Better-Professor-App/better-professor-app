import React, { useState } from 'react';
import {
  Collapse, DropdownItem, DropdownMenu, DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink as StyledLink,
  UncontrolledDropdown,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import LogOut from './LogOut';
import logo from './logo.png';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <img className='App-logo' src={logo} alt='better professor logo' />
      </NavbarBrand>
      <NavbarToggler onClick={toggleOpen} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <StyledLink tag="div">
              <NavLink to="/students">Students</NavLink>
            </StyledLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>Projects</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink to="/projects">View All</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink to="/projectform">Add Project</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <LogOut />
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
