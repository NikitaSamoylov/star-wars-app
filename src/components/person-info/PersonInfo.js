import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton';

import './person-info.scss';

const PersonInfo = (props) => {
  const {
    name,
    birth,
    height,
    homeworld,
    mass,
    films,
    starships
  } = props.data
  const { currentPersonLoading } = props;

  const filmsItems = Array.isArray(films) && films.length > 0
    ? films.map((elem, index) => {
      return (
        <li key={ index }
          className="specific-list__item film-list__item">
          <Link className='film-list__link'
            to={ `/films/${ elem.url.match(/[0-9]/gm).join('') }` }>
            { elem.title }
          </Link>
        </li>
      )
    })
    : <li className="specific-list__item film-list__item">
      no films
    </li>

  const starshipsItems = Array.isArray(starships)
    && starships.length > 0 ?
    starships.map((elem, index) => {
      return (
        <li key={ index }
          className="specific-list__item film-list__item">
          <Link className='film-list__link' to={ '*' }>
            { elem.name }
          </Link>
        </li>
      )
    }) :
    <li className="specific-list__item film-list__item">
      <Link className='film-list__link'>
        no starships
      </Link>
    </li>

  return (
    <div className='main-info__specific-info specific-info'>
      { currentPersonLoading
        ? <Skeleton data='pick info' />
        : View(
          height,
          name,
          mass,
          birth,
          homeworld,
          filmsItems,
          starshipsItems
        ) }

    </div>
  )
}

const View = (
  height,
  name,
  mass,
  birth,
  homeworld,
  filmsItems,
  starshipsItems
) => {

  return (
    <>
      <div className="specific-info__header specific-header">
        <div className="specific-header__info header-info">
          <h2 className="header-info__title">
            { name }
          </h2>
          <p className="header-info__description">height:
            { height } cm
          </p>
          <p className="header-info__description">
            mass: { mass } kg
          </p>
          <p className="header-info__description">
            born: { birth }
          </p>
          <p className="header-info__description">
            homeworld: { homeworld }
          </p>
        </div>
      </div>
      <h3 className="specific-info__subtitle">
        Films
      </h3>
      <ul className="specific-info__films specific-list films-list">
        { filmsItems }
      </ul>
      <h3 className="specific-info__subtitle">Starships</h3>
      <ul className="specific-info__starship specific-list starship-list">
        { starshipsItems }
      </ul>
    </>
  )
}

export default PersonInfo;