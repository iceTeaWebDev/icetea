import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';
import { Link } from "react-router-dom";
const ServiceAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    userService.getServiceBoard().then(res => {
      setData(res.data.data)
    })
  })

  return (
    <div id="page-content-wrapper">
      <div class="container-fluid px-4">
        <button type="button" class="btn btn-primary mt-4">
          <Link to={"/admin/create_service"} className="nav-link">
            Create service
          </Link>
        </button>
        <div class="row my-5">
          <h3 class="fs-4 mb-3">Service</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">service_id</th>
                  <th scope="col">service_name</th>
                </tr>
              </thead>
              <tbody>
                {data.map(service => (
                  <tr>
                    <th scope="row">{service.service_id}</th>
                    <td>{service.service_name}</td>
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

export default ServiceAdmin