
import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "font-awesome/css/font-awesome.min.css"
import Body from './Components/Body'
import Navbar from './Components/Navbar'
import AuthRoute from './Authsrout/AuthRoute'
import ProtectedRoutes from './Authsrout/ProtectedRoutes'

function App() {

  return (

    <Routes>

      <Route element={<AuthRoute />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path='/Navbar' element={<Navbar />}></Route>
        <Route path='/Body' element={<Body />} />
      </Route>


    </Routes>



    // <>
    //   <Routes>
    //     {/* Authentiction Routes */}
    //     <Route element={<AuthRoute />}>
    //       <Route path='/' element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />
    //     </Route>

    //     {/* Protected Routes */}

    //     <Route element={<ProtectedRoutes />}>
    //       <Route path="/navbar" element={<Navbar />} />
    //       <Route path="/body" element={<Body />} />

    //     </Route>
    //     {/* <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>} ></Route> */}
    //   </Routes>
    // </>


  )
}

export default App
