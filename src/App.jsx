import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import AboutUs from './components/AboutUs/AboutUs';
import Form from './components/Form/Form';
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// npm run dev ==> en la terminal dentro de la carpeta 'vite-project' para correr el front

function App() {

  return (
    <div>

  <Routes>

  <Route path='/' element={<Landing/>}/>

  <Route path='/Login' element={<Login/>}/>

  <Route path='/Register' element={<Register/>}/>

  <Route path='/Home' element={<Home/>}/>

  <Route path='/Details' element={<Details/>}/>

  <Route path='/AboutUs' element={<AboutUs/>}/>

  <Route path='/Form' element={<Form/>}/>

  <Route path='/Cart' element={<Cart/>}/>

  </Routes>

    </div>
  )
}

export default App
