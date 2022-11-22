import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';
import { Link } from "react-router-dom";
const CommentAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    userService.getCommentBoard().then(res => {
      setData(res.data.data)
    })
  })

  return (
    <div id="page-content-wrapper">
      <div class="container-fluid px-4">
        <div class="row my-5">
          <h3 class="fs-4 mb-3">Comment</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">comment_id</th>
                  <th scope="col">comment_hotel_id</th>
                  <th scope="col">comment_data</th>
                  <th scope="col">comment_date</th>
                  <th scope="col">user_id</th>
                </tr>
              </thead>
              <tbody>
                {data.map(comment => (
                  <tr>
                    <th scope="row">{comment.comment_id}</th>
                    <td>{comment.comment_hotel_id}</td>
                    <td>{comment.comment_data}</td>
                    <td>{comment.comment_date}</td>
                    <td>{comment.comment_user_id}</td>
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

export default CommentAdmin