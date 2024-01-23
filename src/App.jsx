import './App.css'
import Form from './Components/form';

import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Form />} />
        </Route>

        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
      </Route>
    ));
  return (
    <RouterProvider
      router={router}
      fallbackElement={<span>Loading...</span>}
    />
  )
}

export default App
