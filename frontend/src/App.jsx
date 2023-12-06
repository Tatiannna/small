import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Home from './components/Home/Home';


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home />
  },

  {
    path: "*",
    element: < Navigate to="/" />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
