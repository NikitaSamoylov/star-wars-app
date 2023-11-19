import { Component } from 'react';
import './people-item.scss';

class PeopleItem extends Component {
    render() {
        return (
            <>
             <li className="people-list__item">name {this.props.name}</li>
            </>
        )
    }
}

export default PeopleItem;