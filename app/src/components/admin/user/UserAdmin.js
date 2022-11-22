import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';
import { Link } from "react-router-dom";

const UserAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    userService.getUserBoard().then(res => {
      setData(res.data.data)
    })
  })

  return (
    <div id="page-content-wrapper">
      <div class="container-fluid px-4">
        <button type="button" class="btn btn-primary mt-4">
          <Link to={"/admin/create_user"} className="nav-link">
            Create user
          </Link>
        </button>
        <div class="row my-5">
          <h3 class="fs-4 mb-3">User</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">user_id</th>
                  <th scope="col">username</th>
                  <th scope="col">email</th>
                  <th scope="col">tel</th>
                  <th scope="col">address</th>
                  <th scope="col">password</th>
                  <th scope="col">role</th>
                </tr>
              </thead>
              <tbody>
                {data.map(user => (
                  <tr>
                    <th scope="row">{user.user_id}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>{user.address}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAdmin