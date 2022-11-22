import React from 'react'
import "./Admin.css"
import {Link , Outlet} from "react-router-dom";
const Admin = () => {
  return (
    <div class="d-flex" id="wrapper">
      {/* <!-- Sidebar --> */}
      <div class="bg-white" id="sidebar-wrapper">
        <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
          class="fas fa-user-secret me-2"></i>Admin</div>
        <div class="list-group list-group-flush my-3">
          <Link to={"/admin/user"} className="list-group-item list-group-item-action bg-transparent second-text active">
            User
          </Link>
          <Link to={"/admin/hotel"} className="list-group-item list-group-item-action bg-transparent second-text active">
            Hotel
          </Link>
          <Link to={"/admin/room"} className="list-group-item list-group-item-action bg-transparent second-text active">
            Room
          </Link>
          <Link to={"/admin/service"} className="list-group-item list-group-item-action bg-transparent second-text active">
            Service
          </Link>
          <Link to={"/admin/bill"} className="list-group-item list-group-item-action bg-transparent second-text active">
            Bill
          </Link>
          <Link to={"/admin/comment"} className="list-group-item list-group-item-action bg-transparent second-text active">
            Comment
          </Link>
        </div>
      </div>
      {/* <!-- /#sidebar-wrapper --> */}

      {/* <!-- Page Content --> */}
      <Outlet />
    </div>
  )
}

export default Admin