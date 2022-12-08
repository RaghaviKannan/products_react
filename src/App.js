import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Product from './Product';
import Register from './Register';
import Login from './Login';

function App() {
  return(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/products' element={<Product/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>)
}
  

export default App;
