import { useState, useEffect } from 'react';
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
        return <FilmsItem key={id} {...itemProps} />
    })

    const spinner = loading ? <Preloader/> : null;
    const isError = error ? <OnError/> : null

    return (
        <div className="main-info__content info-content">
            {spinner}
            {isError}
            {filmsElements}
        </div>
    )
}  

export default FilmsList;