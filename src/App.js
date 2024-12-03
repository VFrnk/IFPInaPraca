import './App.css';
import Home from './Screens/Home/Home';
import Game from './Screens/Game/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/a' element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
