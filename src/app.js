import './styles/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact></Route>
      </Routes>
    </BrowserRouter>
  );
}
