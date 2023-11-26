import Header from '../header/Header';
import PeopleList from '../people-list/PeopleList';

import './app.scss';

function App() {
  return (
    <div className="app">
      <Header/>
      <section className="main-info">
                <div className="container main-info__container">
                    <div className="main-info__all">
                        <ul className="people-list">
                        <PeopleList/>
                        </ul>
                    </div>
                    <div className="main-info-right-block">
                      
                    </div>
                </div>
            </section>
    </div>
  );
}

export default App;
