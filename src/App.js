import './App.css';
import Layout from './components/layout/Layout';
import LyricsList from './components/lyrics/HitsList.js';
import Search from './components/searchForm/Search';
import { ContextSearchProvider } from './components/store/ContextSearch';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LyricPage from './components/lyrics/LyricPage';
import About from './components/about/About';
import ArtistPage from './components/artists/ArtistPage';


function App() {
 
  return (
    <ContextSearchProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Search />
              <LyricsList />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route path="/artist/:id">
              <ArtistPage/>
            </Route>
            <Route exact path="/lyrics/:id">
              <LyricPage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ContextSearchProvider>
  );
}

export default App;
