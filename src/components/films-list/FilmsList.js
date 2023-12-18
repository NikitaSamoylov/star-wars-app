import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AppServices from '../../services/AppServices';
import FilmsItem from '../films-item/FilmsItem';
import Preloader from "../preloader/Preloader";
import OnError from "../error/Error";

import './films-list.scss';

const FilmsList = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const {getFilmsList} = AppServices();

    useEffect(() => {
        getFilmsList()
            .then(onFilmsLoaded)
            .catch(onCatchError)
    }, []);

    const onFilmsLoaded = (data) => {
        setFilms(data);
        setLoading(false);
    }

    const onCatchError = () => {
        setLoading(false);
        setError(true);
        setFilms([]);
    }

    const filmsElements = films.map((el) => {
        const {id, ...itemProps} = el;
        return (
            <CSSTransition timeout={500} classNames="item">
                <FilmsItem key={id} {...itemProps} id={id} />
            </CSSTransition>
        )
    })

    const spinner = loading ? <Preloader/> : null;
    const isError = error ? <OnError/> : null

    return (
        <ul className="main-info__content info-content">
            {spinner}
            {isError}
            <TransitionGroup component={null}>
                {filmsElements}
            </TransitionGroup>
        </ul>
    )
}  

export default FilmsList;