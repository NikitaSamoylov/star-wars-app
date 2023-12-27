import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AppServices from '../../services/AppServices';

import '../../resources/img/clear-input.png';
import './search-form.scss';

const SearchForm = ({choosePerson}) => {
    const [SearchStatus, setSearchStatus] = useState('Or find a person by name');
    const [foundedPerson, setFoundedPerson] = useState([]);
    const [isError, setIsError] = useState(false);

    const {searchPerson} = AppServices();

    const getPersonByName = (personInputName) => {
        setSearchStatus(`Search ${personInputName} ...`)
        searchPerson(personInputName)
            .then(onPersonGotten)
            .catch(onErrorOccur)
    }

    const onErrorOccur = () => {
        setIsError(true);
    }

    const onPersonGotten = (data) => {
        data.id
            ? setSearchStatus(`Person found`)
            : setSearchStatus(`Person not found`)
        data.id && setFoundedPerson(data)
    }

    return (
        <Formik
            initialValues={{
                personInputName: '',
            }}
            validationSchema={Yup.object({
                personInputName: Yup.string().required('This field is required')
            })}
            onSubmit={({personInputName}) => {
                setFoundedPerson(null)
                getPersonByName(personInputName);
            }}
            >
            <Form className='search-form'>
                <h3 className='search-form__title'>{SearchStatus}</h3>
                <div className="search-form__content">
                    <Field type="text"
                            className="search-form__input"
                            name="personInputName" />
                    <button type='submit'
                            className="search-form__btn button">
                        Search
                    </button>
                    <button className='search-form__clear' type='reset'><img src={require('../../resources/img/clear-input.png')} alt="clear" /></button>
                </div>
                <ErrorMessage className="search-form__error" name="personInputName" component="div" />
                {isError ? <div className="search-form__error">Error Occur, Reload</div> : null}
                {foundedPerson !== null
                                        ? <div className="search-form__error">Learn more about
                                                <span className='search-form__more'
                                                        onClick={() => choosePerson(foundedPerson.id, null)}>  {foundedPerson.name}
                                                </span>
                                            </div>
                                        : null 
                }
            </Form>
        </Formik>
    )
}

export default SearchForm;