import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import logo from '../assets/logo-wo-bg.png'
import logo from '../assets/logo-2.png'


function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const logoutHandler = () => {
    localStorage.removeItem("uid");
}
  

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo} alt="logo"  />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
         
          
        
          <li className='nav-item'>
            <Link
              to='/Logout'
              className='nav-links'
              onClick={logoutHandler}              
            >
              Logout
            </Link>
          </li>
        
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
