import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewAll from './elements/ViewAll.jsx'
import Create from './elements/Create.jsx'
import Editar from './elements/Editar.jsx'


import 'bootstrap/dist/css/bootstrap.min.css'
function App(){
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/viewall" element={<ViewAll />} />
      <Route path="/viewall/editar/:id" element={<Editar />} />
      <Route path="/busca" element={<Busca />} />

      
     

        
      </Routes>
    </BrowserRouter>
  )
}
export default App