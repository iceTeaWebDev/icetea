import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.css';
import authService from './services/auth.service';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Admin from './components/admin/Admin';
import HotelAdmin from './components/admin/hotel/HotelAdmin';
import BillAdmin from './components/admin/bill/BillAdmin';
import UserAdmin from './components/admin/user/UserAdmin';
import RoomAdmin from './components/admin/room/RoomAdmin';
import ServiceAdmin from './components/admin/service/ServiceAdmin';
import CommentAdmin from './components/admin/comment/CommentAdmin';
import CreateUser from './components/admin/user/CreateUser';
import CreateHotel from './components/admin/hotel/CreateHotel';
import CreateBill from './components/admin/bill/CreateBill';
import CreateRoom from './components/admin/room/CreateRoom';
import CreateService from './components/admin/service/CreateService';
import UpdateUser from './components/admin/user/UpdateUser';
import UpdateHotel from './components/admin/hotel/UpdateHotel';
import UpdateBill from './components/admin/bill/UpdateBill';
import UpdateComment from './components/admin/comment/UpdateComment';
import UpdateRoom from './components/admin/room/UpdateRoom';
import UpdateService from './components/admin/service/UpdateService';
import Detail from './components/Detail';

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
          <Link to={"/admin"} className="nav-link">
            Admin
          </Link>
          {state.role === 'admin' && (
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
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="hotel" element={<HotelAdmin />}/>
          <Route path="bill" element={<BillAdmin />}/>
          <Route path="user" element={<UserAdmin />}/>
          <Route path="room" element={<RoomAdmin />}/>
          <Route path="service" element={<ServiceAdmin />}/>
          <Route path="comment" element={<CommentAdmin />}/>
          <Route path="create_user" element={<CreateUser />}/>
          <Route path="create_hotel" element={<CreateHotel />}/>
          <Route path="create_bill" element={<CreateBill />}/>
          <Route path="create_room" element={<CreateRoom />}/>
          <Route path="create_service" element={<CreateService />}/>
          <Route path="update_user" element={<UpdateUser />}/>
          <Route path="update_hotel" element={<UpdateHotel />}/>
          <Route path="update_bill" element={<UpdateBill />}/>
          <Route path="update_comment" element={<UpdateComment />}/>
          <Route path="update_room" element={<UpdateRoom />}/>
          <Route path="update_service" element={<UpdateService />}/>
        </Route>
        <Route path="/details/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;