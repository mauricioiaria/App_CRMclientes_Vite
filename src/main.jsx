import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//** Creaccion del Router-Dom */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//* Imports Components */
import Loyout from './components/Loyout';
import NuevoCliente, {
  action as nuevoClienteAction,
} from './pages/NuevoCliente';
import Index, { loader as clientesLoader } from './pages/Index';
import ErrorPage from './components/ErrorPages';
import EditarCliente, {
  loader as editarClienteLoader,
  action as editarClienteAction,
} from './pages/EditarCliente';
import { action as eliminarClienteAction } from './components/Cliente';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Loyout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cliente/:clienteId/eliminar',
        action: eliminarClienteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
