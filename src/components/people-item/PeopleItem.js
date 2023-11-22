import { Component } from 'react';

import './people-item.scss';

class PeopleItem extends Component {
    render() {
        const {image, name, clickItem} = this.props;
        return (
            <>
             <li className="people-list__item people-item" onClick={clickItem}>
                <img className="people-item__img" src={image} alt="avatar"/>
                <h2 className="people-item__name">{name}</h2>
             </li>
            </>
        )
    }
}

export default PeopleItem;