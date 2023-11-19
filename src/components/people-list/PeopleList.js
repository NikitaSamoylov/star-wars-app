import { Component } from "react";
import AppServices from "../../services/AppServices";
import PeopleItem from "../people-item/PeopleItem";

import './people-list.scss';

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        }
    }

    peopleListResponse = new AppServices()

    componentDidMount() {
        this.peopleListResponse.getPeopleData()
        .then(this.renderElements)
    }

    renderElements = (data) => {
        this.setState({data})
    }

    render() {
        const elements = this.state.data.map((elem) => {
            const id = elem.image.match(/[0-9]/gm).join('');
            return <PeopleItem key={id} name={elem.name} image={elem.image} />
        })
        return (
            <section className="main-info">
                <div className="container main-info__container">
                    <div className="main-info__all">
                        <ul className="people-list">
                            {elements}
                        </ul>
                    </div>
                    <div className="main-info__specific-item"></div>
                </div>
            </section>
        )
    }
}

export default PeopleList;
