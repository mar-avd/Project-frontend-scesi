//import './App.css';
import './assets/scss/stylesheet.scss';
import { BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

        </Routes>
        <div className='container'>
          <p>Prueba</p>
          <button className='btn btn-primary'>Click me</button>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
