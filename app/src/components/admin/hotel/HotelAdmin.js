import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';
import { Link } from "react-router-dom";
const HotelAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    userService.getHotelBoard().then(res => {
      setData(res.data.data)
    })
  })

  return (
    <div id="page-content-wrapper">
      <div class="container-fluid px-4">
      <button type="button" class="btn btn-primary mt-4">
          <Link to={"/admin/create_hotel"} className="nav-link">
            Create hotel
          </Link>
        </button>
        <div class="row my-5">
          <h3 class="fs-4 mb-3">Hotel</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">hotel_id</th>
                  <th scope="col">hotel_name</th>
                  <th scope="col">hotel_rate</th>
                  <th scope="col">hotel_address</th>
                  <th scope="col">hotel_image</th>
                  <th scope="col">hotel_description</th>
                </tr>
              </thead>
              <tbody>
                {data.map(hotel => (
                  <tr>
                    <th scope="row">{hotel.hotel_id}</th>
                    <td>{hotel.hotel_name}</td>
                    <td>{hotel.hotel_rate}</td>
                    <td>{hotel.hotel_address}</td>
                    <td><img src={'/images/'+hotel.hotel_image} class="rounded" alt="" style={{"width": "100px"}}/></td>
                    <td>{hotel.hotel_description}</td>
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

export default HotelAdmin