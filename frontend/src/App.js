
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import DetailedProduct from './Pages/DetailedProduct';
import AllProduct from './components/AllProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/product/:id' element={<DetailedProduct/>} />
        <Route path='/products' element={<AllProduct/>} />
      </Routes>
    </>
  );
}

export default App;
<h1>Hello here is your Maddy's E-commerce</h1>