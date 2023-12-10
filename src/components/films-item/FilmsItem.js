import './films-item.scss';

const FilmsItem = (films) => {
    return (
        <div className="info-content__item content-item">
            <img className="content-item__img" src={films.filmsImg} alt="film-poster" />
            <h2 className="content-item__title">
                {films.title}
            </h2>
        </div>
    )
}

export default FilmsItem;