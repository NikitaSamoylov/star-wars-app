import React, { Component } from 'react';

import './header.scss';
import '../../resources/img/swlogo.png';

class Header extends Component {
    state = {
        headerClass: 'header',
      }

    listenScrollEvent = (e) => {
        if (window.scrollY > 40) {
            this.setState({headerClass: 'header header--scroll'})
        } else {
            this.setState({headerClass: 'header'})
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
    }

    render () {
        return (
            <header className={this.state.headerClass}>
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
}

export default Header;

