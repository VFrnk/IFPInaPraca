import './App.css';
import '@fontsource/roboto';
import Gameover from './Screens/Gameover/Gameover';
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
        <Route path='/end' element={<Gameover/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
