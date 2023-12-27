import {useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppServices from '../../../services/AppServices';
import Preloader from '../../preloader/Preloader';
import OnError from '../../error/Error';
import './choosen-film.scss';

const ChoosenFilm = () => {
  const {filmId} = useParams();
  const [choosenFilm, setChoosenFilm] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getChoosenFilmInfo()
  }, [choosenFilm])

  const {getChoosenFilm} = AppServices();

  const getChoosenFilmInfo = () => {
    getChoosenFilm(filmId)
      .then(onFilmLoaded)
      .catch(onErrorCatch)
  }

  const onErrorCatch = () => {
    setLoading(false);
    setError(true);
    choosenFilm([]);
  }

  const onFilmLoaded = (data) => {
    setLoading(false);
    setChoosenFilm(data);
  }

  const spinner = loading ? <Preloader/> : null;
  const isError = error ? <OnError/> : null;
  const choosenFilmRender = spinner || isError ? null : ChoosenFilmView(choosenFilm)

  return (
    <>
      {spinner}
      {isError}
      {choosenFilmRender}
    </>
  )
}

const ChoosenFilmView = (data, navigate) => {
  const {title, descr, release, poster} = data;

  return (
    <>
      <img className="film-info__img" src={poster} alt="film poster" />
      <div className="film-info__content film-content">
        <h2 className="film-content__title">{title}</h2>
        <p className="film-content__descr">
          {descr}
        </p>
        <p className="film-content__descr">Release: {release}</p>
      </div>
      <Link to={'/films'} className='film-content__btn'>Look at all films</Link>
    </>
  )
}

export default ChoosenFilm;