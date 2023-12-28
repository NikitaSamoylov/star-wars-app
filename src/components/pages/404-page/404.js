import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import '../../../resources/img/page404.png';

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="404 page"
                />
                <title>Page does not exist</title>
            </Helmet>
            <div style={{
                display: 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                <img src={require('../../../resources/img/page404.png')}
                        alt="page not found"
                        style={{width: '300px', height: 'auto', display: 'block', marginBottom: '3rem'}} />
                <h2 style={{fontSize: '2rem', marginBottom: '2rem', color: '#B2B3BF'}}>Page doesn't exist</h2>
                <h2><Link to="/" style={{fontSize: '2rem', color: '#C5A95D'}}>Main page</Link></h2>
            </div>
        </>
    )
}

export default Page404;