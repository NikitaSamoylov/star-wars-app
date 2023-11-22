import { Component } from "react";
import AppServices from "../../services/AppServices";
import PeopleItem from "../people-item/PeopleItem";
import Preloader from "../preloader/Preloader";
import OnError from "../error/Error";
import PersonInfo from "../person-info/PersonInfo";

import './people-list.scss';

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: false,
        }
    }

    peopleListResponse = new AppServices()

    componentDidMount() {
        this.peopleListResponse.getPeopleData()
        .then(this.renderElements)
        .catch(this.catchError)
    }

    catchError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    renderElements = (data) => {
        this.setState({data, loading: false},)
    }

    clickItem = (id) => {
        console.log(id)
    }

    render() {
        const elements = this.state.data.map((elem) => {
            const id = elem.image.match(/[0-9]/gm).join('');
            return <PeopleItem
                            key={id}
                            name={elem.name}
                            image={elem.image}
                            clickItem={() => this.clickItem(id)}
                            />
        })
        const spinner = this.state.loading ? <Preloader/> : null;
        const isError = this.state.error ? <OnError/> : null;

        return (
            <section className="main-info">
                <div className="container main-info__container">
                    <div className="main-info__all">
                        <ul className="people-list">
                            {spinner}
                            {isError}
                            {elements}
                        </ul>
                    </div>
                    {spinner || isError ? null : <PersonInfo />}
                </div>
            </section>
        )
    }
}

export default PeopleList;

