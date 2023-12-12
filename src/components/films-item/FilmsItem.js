import {Link} from 'react-router-dom';
import './films-item.scss';

const FilmsItem = (films) => {
    return (
        <li className="info-content__item content-item">
            <Link to={`/films/${films.id}`}>
                <img className="content-item__img" src={films.filmsImg} alt="film-poster" />
                <h2 className="content-item__title">
                    {films.title}
                </h2>
            </Link>
        </li>
    )
}

export default FilmsItem;