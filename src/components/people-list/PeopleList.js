import { useState, useEffect } from "react";
import AppServices from "../../services/AppServices";
import PeopleItem from "../people-item/PeopleItem";
import Preloader from "../preloader/Preloader";
import OnError from "../error/Error";
import PersonInfo from "../person-info/PersonInfo";

import './people-list.scss';

const PeopleList = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentPerson, setCurrentPerson] = useState([]);
    const [currentPersonLoading, setCurrentPersonLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Choose the person from left');
    const [peopleCardsEnd, setPeopleCardsEnd] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);


    const peopleListResponse = new AppServices();

    useEffect(() => {
        loadPersonData();
    }, []);

    const loadPersonData = () => {
        setCurrentPage(currentPage + 1);
        setBtnDisabled(true);

        peopleListResponse.getPeopleData(currentPage)
            .then(renderElements)
            .catch(catchError)
    }

    const catchError = () => {
        setLoading(false);
        setError(true);
        setData([]);
    }

    const renderElements = (newData) => {
        if (newData.length < 9) {
            setPeopleCardsEnd(true)
        }

        setData(data => [...data, ...newData])
        setBtnDisabled(false);
        setLoading(false);
    }

    const choosePerson = (id, current) => {
        if (currentPerson.length !== 0
            && currentPerson.id === id) {
            return;
        }

        setData(data.map((el) => {
            if (el.name === current.textContent) {
                return {...el, isActive: true}
            } else {
                return {...el, isActive: false}
            }
        }))
        setCurrentPersonLoading(true);
        setLoadingMessage('Intergalactic search has begun');
        peopleListResponse.getPersonInfo(id)
            .then(renderCurrentPerson)
            .catch(catchError)
    }

    const renderCurrentPerson = (currentPerson) => {
        setCurrentPerson(currentPerson);
        setCurrentPersonLoading(false);
        setLoadingMessage('The character found, try another one');
    }

    const elements = data.map((elem) => {
        const id = elem.image.match(/[0-9]/gm).join('');
        return <PeopleItem
                    key={id}
                    name={elem.name}
                    image={elem.image}
                    isActive={elem.isActive}
                    clickItem={(e) => choosePerson(id, e.currentTarget)}
                />
    })
    const spinner = loading ? <Preloader/> : null;
    const isError = error ? <OnError/> : null;
    const personMessageView = spinner
                                || isError    
                                            ? null
                                            : <h3 className="main-info-right-title">{loadingMessage}</h3>
    const personView = spinner
                        || isError
                                    ? null
                                    : <PersonInfo data={currentPerson}
                                                    currentPersonLoading={currentPersonLoading} />
    const cardButton = spinner
                        || isError
                                    ? null
                                    : <button className="button 
                                                        people-list__button
                                                        button--card"
                                                style={{display: peopleCardsEnd ? 'none' : 'block'}}
                                                onClick={loadPersonData}
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

export default PeopleList;

