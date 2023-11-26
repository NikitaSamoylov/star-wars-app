import { Component } from "react";
import AppServices from "../../services/AppServices";
import PeopleItem from "../people-item/PeopleItem";
import Preloader from "../preloader/Preloader";
import OnError from "../error/Error";
import PersonInfo from "../person-info/PersonInfo";
import ErrorBoundary from "../error-boundary/error-boundary-image/ErrorBoundary";
import ErrorBoundaryMsg from "../error-boundary/error-boundary-msg/ErrorBoundaryMsg";

import './people-list.scss';

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: false,
            currentPerson: [],
            currentPersonLoading: true,
            loadingMessage: 'Choose the person from left'
        };
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
        this.setState({data, loading: false})
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
        const {data, loading, error, loadingMessage, currentPerson, currentPersonLoading} = this.state;
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
                    <div className="main-info-right-block">
                        {spinner || isError    
                                                ? null
                                                : <ErrorBoundaryMsg>
                                                    <h3 className="main-info-right-title">{loadingMessage}</h3>
                                                </ErrorBoundaryMsg>}
                        {spinner || isError
                                            ? null
                                            : <ErrorBoundary>
                                                <PersonInfo data={currentPerson}
                                                            currentPersonLoading={currentPersonLoading} />
                                            </ErrorBoundary>}
                                            
                    </div>
                </div>
            </section>
        )
    }
}

export default PeopleList;

