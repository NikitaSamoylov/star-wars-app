import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';
import '../../resources/img/swlogo.png';

const Header = () => {
  const [headerClass, setHeaderClass] = useState('header');

  const listenScrollEvent = (e) => {
    if (window.scrollY > 40) {
      setHeaderClass('header header--scroll')
    } else {
      setHeaderClass('header')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return (() => {
      window.removeEventListener('scroll', listenScrollEvent);
    })
  }, [])

  return (
    <header className={ headerClass }>
      <div className="container header__container">
        <Link to="/"><img
          src={ require('../../resources/img/swlogo.png') }
          alt="logo"
          tabIndex={ 1 } /></Link>
        <ul className="nav">
          <li className="nav__item nav__item--active" tabIndex={ 2 }>
            <NavLink end
              className="nav__item-link"
              to="/"
              style={ ({ isActive }) => ({ color: isActive ? "#C5A95D" : "inherit" }) }>
              Characters
            </NavLink>
          </li>
          <li className="nav__item" tabIndex={ 3 }>
            <NavLink className="nav__item-link"
              to="/films"
              style={ ({ isActive }) => ({ color: isActive ? "#C5A95D" : "inherit" }) }>
              Films
            </NavLink>
          </li>
          <li className="nav__item" tabIndex={ 4 }>
            <NavLink end
              className="nav__item-link"
              to="/starships"
              style={ ({ isActive }) => ({ color: isActive ? "#C5A95D" : "inherit" }) }>
              Starships
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;

