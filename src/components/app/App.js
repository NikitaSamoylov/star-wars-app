import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import Preloader from '../preloader/Preloader';

import './app.scss';

const MainPage = lazy(() => import('../pages/main-page/MainPage'));
const FilmsPage = lazy(() => import('../pages/films-page/FilmsPage'));
const ChoosenFilm = lazy(() => import('../pages/choosenFilm-page/ChoosenFilm'));
const Page404 = lazy(() => import('../pages/404-page/404'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header/>
        <section className="main-info">
          <div className="container main-info__container">
            <Suspense fallback={<Preloader/>}>
              <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/films" element={<FilmsPage/>} />
                <Route path="/films/:filmId" element={<ChoosenFilm/>} />
                <Route path="*" element={<Page404/>} />
              </Routes>
            </Suspense>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
