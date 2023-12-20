import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/nav/Header.js';
import Home from './components/pages/Home.js'
import Search from './components/pages/search/Search.js';
import Animals from './components/pages/Animals.js';
import Plants from './components/pages/plants/Plants.js';
import Weather from './components/pages/Weather.js';
import About from './components/pages/About.js';



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Search' element={<Search/>} />
        <Route path='/weather' element={<Weather/>} />
        <Route path='/animals' element={<Animals/>} /> 
        <Route path='/plants' element={<Plants/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;
