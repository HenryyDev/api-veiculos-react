import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Create from './elements/Create'
import ViewAll from './elements/ViewAll.jsx'
import Editar from './elements/Editar.jsx'
import Busca from './elements/Busca.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  

} from "react-router-dom";
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Create/>
    },
    {
      path: '/viewall',
      element:<ViewAll/>,
    },
    {
      path: '/viewall/editar/:id',
      element:<Editar/>,
    },
    {
      path: '/busca',
      element:<Busca/>,
    },
  ]);
  

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
