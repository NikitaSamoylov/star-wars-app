import { Component } from 'react';
import '../../resources/img/default-img.png';

import './person-info.scss';

class PersonInfo extends Component {
    render() {
        return (
            <div className='main-info__specific-info specific-info'>
                <div className="specific-info__header specific-header">
                    <img src={require("../../resources/img/default-img.png")}
                            alt="person" className="specific-header__img" />
                    <div className="specific-header__info header-info">
                    <h2 className="header-info__title">Loki</h2>
                    <p className="header-info__description">height: 177 cm</p>
                    <p className="header-info__description">mass: 77 kg</p>
                    <p className="header-info__description">born: 19BBY</p>
                    <p className="header-info__description">homeworld: Tattoine</p>
                    <button className="button header-info__btn">Load more</button>
                    </div>
                </div>
                <p className="specific-info__description info-description">
                    In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
                </p>
                <h3 className="specific-info__subtitle">films</h3>
                <ul className="specific-info__films specific-list films-list">
                    <li className="specific-list__item film-list__item">
                         All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="specific-list__item film-list__item">
                            All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="specific-list__item film-list__item">
                         All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                </ul>
                <h3 className="specific-info__subtitle">starships</h3>
                <ul className="specific-info__starship specific-list starship-list">
                    <li className="specific-list__item starship-list__item">
                         All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="specific-list__item starship-list__item">
                            All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="specific-list__item starship-list__item">
                         All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                </ul>

            </div>
        )
    }
}

export default PersonInfo;