import { useState, useEffect } from "react";
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
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
    const [peopleCardsEnd, setPeopleCardsEnd] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [searchStatusMsg, setSearchStatusMsg] = useState('Choose the person from left');

    const {getPeopleData, getPersonInfo} = AppServices();

    useEffect(() => {
        loadPersonData();
    }, []);

    const loadPersonData = () => {
        setCurrentPage(currentPage + 1);
        setBtnDisabled(true);

        getPeopleData(currentPage)
            .then(renderElements)
            .catch(catchError)
    };

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
        setSearchStatusMsg('Intergalactic search has begun');
        getPersonInfo(id, setSearchStatusMsg)
            .then(renderCurrentPerson)
            .catch(catchError)
    }

    const renderCurrentPerson = (currentPerson) => {
        setCurrentPerson(currentPerson);
        setCurrentPersonLoading(false);
        setSearchStatusMsg('The character found, try another one');
    }

    const elements = data.map((elem) => {
        const id = elem.image.match(/[0-9]/gm).join('');
        return (
            <CSSTransition timeout={500} classNames="item">
                <PeopleItem
                        key={id}
                        name={elem.name}
                        image={elem.image}
                        isActive={elem.isActive}
                        clickItem={(e) => choosePerson(id, e.currentTarget)}
                />
            </CSSTransition>
        )
    })
    const spinner = loading ? <Preloader/> : null;
    const isError = error ? <OnError/> : null;
    const personMessageView = spinner || isError    
                                                ? null
                                                : (
                                                    <CSSTransition classNames="item" timeout={300}>
                                                        <h3 className="main-info-right-title">{searchStatusMsg}</h3>
                                                    </CSSTransition>
                                                )
    const personView = spinner || isError
                                        ? null
                                        : (
                                            <CSSTransition classNames="item" timeout={300}>
                                                <PersonInfo data={currentPerson}
                                                                currentPersonLoading={currentPersonLoading} />
                                            </CSSTransition>
                                        )
    const cardButton = spinner || isError
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
        <>
            <div className="main-info__all">
                <ul className="people-list">
                    {spinner}
                    {isError}  
                    <TransitionGroup component={null}>
                        {elements}
                    </TransitionGroup>
                </ul>
                {cardButton}
            </div>
            <div className="main-info-right-block">
            <TransitionGroup component={null}>
                {personMessageView}
                {personView}
            </TransitionGroup>
            </div>
        </>
    )
}

export default PeopleList;

