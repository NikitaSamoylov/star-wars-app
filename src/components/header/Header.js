import React, { useState, useEffect } from 'react';

import './header.scss';
import '../../resources/img/swlogo.png';

const Header = () =>  {
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
        <header className={headerClass}>
            <div className="container header__container">
                <a href="/"><img
                    src={require('../../resources/img/swlogo.png')}
                    alt="logo"
                    tabIndex={1}/></a>
                <ul className="nav">
                    <li className="nav__item nav__item--active"
                        tabIndex={2}>Characters</li>
                    <li className="nav__item"
                        tabIndex={3}>Films</li>
                    <li className="nav__item"
                        tabIndex={4}>Starships</li>
                </ul>
            </div>
        </header>
    )
}

export default Header;

