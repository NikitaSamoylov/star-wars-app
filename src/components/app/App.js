import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import { MainPage, FilmsPage } from '../pages';

import './app.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header/>
        <section className="main-info">
          <div className="container main-info__container">
            <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/films" element={<FilmsPage/>} />
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
