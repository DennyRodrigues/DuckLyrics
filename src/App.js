import './App.css';
import Layout from './components/layout/Layout';
import LyricsList from './components/lyrics/HitsList.js';
import Search from './components/searchForm/Search';
import { ContextSearchProvider } from './components/store/ContextSearch';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LyricPage from './components/lyrics/LyricPage';
import About from './components/about/About';
import ArtistPage from './components/artists/ArtistPage';


function App() {
 
  return (
    <ContextSearchProvider>
      <Router>
        
          <Routes>
            <Route exact path="/" element={<Layout/>}>
              <Route path="/" element={ <div> <Search/> <LyricsList /> </div>}/>
            <Route exact path="/about" element={<About />}/>
            <Route path="/artist/:id" element={<ArtistPage/>}/>
            <Route exact path="/lyrics/:id" element={<LyricPage />}/>
            </Route>
          </Routes>
      </Router>
    </ContextSearchProvider>
  );
}

export default App;
