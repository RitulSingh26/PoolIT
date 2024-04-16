
import './App.css';
import Upload from './component/Upload';
import Headers from './component/Header';
import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import { UserProvider } from './UserContext';
import Home from './component/Home';
//import Error from './Components/Error';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <UserProvider>
    <>
      <Headers />
      <Routes>
      <Route path='/' element={<Home/>}/>
         <Route path='/upload' element={<Upload />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </>
    </UserProvider>
  );
}

export default App;

