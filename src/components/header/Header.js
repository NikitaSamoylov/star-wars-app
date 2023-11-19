import './header.scss';
import '../../resources/img/swlogo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="container header__container">
                <a href="/"><img src={require('../../resources/img/swlogo.png')} alt="logo"/></a>
                <ul className="nav">
                    <li className="nav__item nav__item--active">characters</li>
                    <li className="nav__item">films</li>
                    <li className="nav__item">starships</li>
                </ul>
            </div>
        </header>
    )
}

export default Header;