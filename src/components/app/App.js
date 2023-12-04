import Header from '../header/Header';
import PeopleList from '../people-list/PeopleList';

import './app.scss';

const App = () => {
  return (
    <div className="app">
      <Header/>
        <PeopleList/>
    </div>
  );
}

export default App;
