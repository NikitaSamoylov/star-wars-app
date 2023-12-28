import { Helmet } from 'react-helmet';

import FilmsList from '../../films-list/FilmsList';

const FilmsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="page with list of star wars films"
                />
                <title>Star Wars films</title>
            </Helmet>
            <FilmsList/>
        </>
    )
};

export default FilmsPage;