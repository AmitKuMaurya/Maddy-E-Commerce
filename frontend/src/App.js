
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailedProduct from './Pages/DetailedProduct';
import AllProduct from './components/AllProduct';
import Header from './components/Header';
import Main from './components/Main';
// import Search from './components/Search';

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/product/:id' element={<DetailedProduct/>} />
        <Route path='/products' element={<AllProduct/>} />
        {/* <Route path='/products/:keyword' element={<AllProduct/>} /> */}
        {/* <Route path='/search' element={<Search/>} /> */}
      </Routes>
    </>
  );
}

export default App;
<h1>Hello here is your Maddy's E-commerce</h1>