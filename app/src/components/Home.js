import React, { useState } from 'react'
import userService from '../services/user.service';
import './home.css';
import ListHotel from './ListHotel';
const Home = () => {

  const [state, setState] = useState({
    address: "",
    check_in_date: "",
    check_out_date: "",
    rooms: ""
  })

  const [data, setData] = useState([]);

  const [res, setRes] = useState({
    message: "",
    loading: false
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.getHotelBySearch(state.address, state.check_in_date, state.check_out_date, state.rooms).then(
      response => {
        setData(response.data.data);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRes({
          loading: false,
          message: resMessage
        });
      }
    )
    
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div id="booking" class="section">
        <div class="section-center">
          <div class="container">
            <div class="row">
              <div class="col-md-7 col-md-push-5">
                <div class="booking-cta">
                  <h1>Make your reservation</h1>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facere, soluta magnam
                    consectetur molestias itaque
                    ad sint fugit architecto incidunt iste culpa perspiciatis possimus voluptates aliquid
                    consequuntur cumque quasi.
                    Perspiciatis.
                  </p>
                </div>
              </div>
              <div class="col-md-4 col-md-pull-7">
                <div class="booking-form">
                  <div class="form-group">
                    <span class="form-label">Your Destination</span>
                    <input class="form-control" type="text"
                      placeholder="Enter a destination or hotel name" onChange={onChange} name="address" />
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <span class="form-label">Check In</span>
                        <input class="form-control" type="date" required onChange={onChange} name="check_in_date" />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <span class="form-label">Check out</span>
                        <input class="form-control" type="date" required onChange={onChange} name="check_out_date" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="form-group">
                        <span class="form-label">Rooms</span>
                        <select class="form-control" onChange={onChange} name="rooms">
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                        <span class="select-arrow"></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-btn">
                    <button class="submit-btn" onClick={handleSubmit}>Check availability</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {res.message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {res.message}
          </div>
        </div>
      )}
      <ListHotel data={data}/>
    </div>
  )
}

export default Home