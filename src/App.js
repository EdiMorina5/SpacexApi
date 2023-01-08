
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Rocket from './pages/Rocket';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
 
          <Route path="/mission/:flightNumber" element={<Rocket />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
