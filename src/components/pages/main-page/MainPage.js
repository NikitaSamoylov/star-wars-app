import { Helmet } from 'react-helmet';
import PeopleList from '../../people-list/PeopleList';

const MainPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="SW information portal"
                />
                <title>Star Wars info portal</title>
            </Helmet>
            <PeopleList/>
        </>
    )
}

export default MainPage;