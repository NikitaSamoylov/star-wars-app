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
            currentPage: 1,
            loading: true,
            error: false,
            currentPerson: [],
            currentPersonLoading: true,
            loadingMessage: 'Choose the person from left',
            btnDisabled: false,
        };
    }

    peopleListResponse = new AppServices()

    componentDidMount() {
        this.loadPersonData()
    }

    loadPersonData = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
            btnDisabled: true,
        })
        this.peopleListResponse.getPeopleData(this.state.currentPage)
            .then(this.renderElements)
            .catch(this.catchError)
    }

    catchError = () => {
        this.setState({
            loading: false,
            error: true,
            data: []
        })
    }

    renderElements = (newData) => {
        this.setState (({data}) => ({
            data: [...data, ...newData],
            btnDisabled: false,
            loading: false
        }))
    }

    choosePerson = (id) => {
        if (this.state.currentPerson.length !== 0
            && this.state.currentPerson.id === id) {
            return;
        }
        this.setState (
            {
                currentPersonLoading: true,
                loadingMessage: 'Intergalactic search has begun',
            }
        )
        this.peopleListResponse.getPersonInfo(id)
            .then(this.renderCurrentPerson)
            .catch(this.catchError)
    }

    renderCurrentPerson = (currentPerson) => {
        this.setState (
            {
                currentPerson,
                currentPersonLoading: false,
                loadingMessage: 'The character found, try another one',
            }
        )
    }

    render() {
        const {data, loading, error, loadingMessage, currentPerson, currentPersonLoading, btnDisabled} = this.state;
        const elements = data.map((elem) => {
            const id = elem.image.match(/[0-9]/gm).join('');
            return <PeopleItem
                        key={id}
                        name={elem.name}
                        image={elem.image}
                        clickItem={() => this.choosePerson(id)}
                    />
        })
        const spinner = loading ? <Preloader/> : null;
        const isError = error ? <OnError/> : null;
        const personMessageView = spinner || isError    
                                                    ? null
                                                    : <h3 className="main-info-right-title">{loadingMessage}</h3>
        const personView = spinner || isError
                                            ? null
                                            : <PersonInfo data={currentPerson}
                                                            currentPersonLoading={currentPersonLoading} />
        const cardButton = spinner || isError
                                            ? null
                                            : <button className="button 
                                                                people-list__button
                                                                button--card"
                                                                onClick={this.loadPersonData}
                                                                disabled={btnDisabled}>
                                                                    Load more
                                            </button>;

        return (
            <section className="main-info">
                <div className="container main-info__container">
                    <div className="main-info__all">
                        <ul className="people-list">
                            {spinner}
                            {isError}  
                            {elements}
                        </ul>
                        {cardButton}
                    </div>
                    <div className="main-info-right-block">
                        {personMessageView}
                        {personView}
                    </div>
                </div>
            </section>
        )
    }
}

export default PeopleList;

