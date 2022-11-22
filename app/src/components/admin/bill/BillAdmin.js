import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';
import { Link } from "react-router-dom";
const BillAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    userService.getBillBoard().then(res => {
      setData(res.data.data)
    })
  })

  return (
    <div id="page-content-wrapper">
      <div class="container-fluid px-4">
        <button type="button" class="btn btn-primary mt-4">
          <Link to={"/admin/create_bill"} className="nav-link">
            Create bill
          </Link>
        </button>
        <div class="row my-5">
        
          <h3 class="fs-4 mb-3">User</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">bill_id</th>
                  <th scope="col">bill_user_id</th>
                  <th scope="col">bill_room_id</th>
                  <th scope="col">bill_date_start</th>
                  <th scope="col">bill_date_end</th>
                  <th scope="col">bill_user_name</th>
                  <th scope="col">bill_user_tel</th>
                  <th scope="col">bill_user_email</th>
                </tr>
              </thead>
              <tbody>
                {data.map(bill => (
                  <tr>
                    <th scope="row">{bill.bill_id}</th>
                    <td>{bill.bill_user_id}</td>
                    <td>{bill.bill_room_id}</td>
                    <td>{bill.bill_date_start}</td>
                    <td>{bill.bill_date_end}</td>
                    <td>{bill.bill_user_name}</td>
                    <td>{bill.bill_user_tel}</td>
                    <td>{bill.bill_user_email}</td>
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

export default BillAdmin