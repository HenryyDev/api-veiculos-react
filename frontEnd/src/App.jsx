import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewAll from './elements/ViewAll.jsx'
import Create from './elements/Create.jsx'


import 'bootstrap/dist/css/bootstrap.min.css'
function App(){
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/viewall" element={<ViewAll />} />
      
     

        
      </Routes>
    </BrowserRouter>
  )
}
export default App