import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';
import { Link } from "react-router-dom";
const RoomAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    userService.getRoomBoard().then(res => {
      setData(res.data.data)
    })
  })

  return (
    <div id="page-content-wrapper">
      <div class="container-fluid px-4">
      <button type="button" class="btn btn-primary mt-4">
          <Link to={"/admin/create_room"} className="nav-link">
            Create room
          </Link>
        </button>
        <div class="row my-5">
          <h3 class="fs-4 mb-3">User</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">room_id</th>
                  <th scope="col">room_hotel_id</th>
                  <th scope="col">room_image</th>
                  <th scope="col">room_service</th>
                  <th scope="col">room_price</th>
                  <th scope="col">room_size</th>
                </tr>
              </thead>
              <tbody>
                {data.map(room => (
                  <tr>
                    <th scope="row">{room.room_id}</th>
                    <td>{room.room_hotel_id}</td>
                    <td>{room.room_image}</td>
                    <td>{room.room_service}</td>
                    <td>{room.room_price}</td>
                    <td>{room.room_size}</td>
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

export default RoomAdmin