import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.css';
import authService from './services/auth.service';
import { useState, useEffect } from 'react';
import Home from './components/Home';
function App() {
  const [state, setState] = useState({
    currentUser: undefined,
    role: ''
  })
  const Logout = () => {
    authService.logout();
    setState({
      currentUser: undefined
    })
  }
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      if (user.role) {
        setState({
          currentUser: user,
          role: 'admin'
        })
      } else {
        setState({
          currentUser: user,
          role: 'user'
        })
      }
    }
  }, []);
  return (
    <div>
      <ul class="nav justify-content-between bg-light">
        <li class="nav-item d-flex">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          {state.role == 'admin' && (
            <Link to={"/"} className="nav-link">
              Admin
            </Link>
          )}
        </li>
        {state.currentUser ? (
          <li class="nav-item d-flex">
            <div className="nav-link">
              Hello '{state.currentUser.username}'
            </div>
            <Link to={"/login"} className="nav-link" onClick={() => Logout()}>
              Logout
            </Link>
          </li>
        ) : (
          <li class="nav-item d-flex">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
        )}
      </ul>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;