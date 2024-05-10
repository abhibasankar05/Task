import React from 'react';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
