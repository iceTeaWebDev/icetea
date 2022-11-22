import React, { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
const ListHotel = ({ data }) => {
    return (
        <>
            {data.map(hotel => (
                <section style={{ "background-color": "#eee" }}>
                    <div class="container py-5">
                        <div class="row justify-content-center mb-3">
                            <div class="col-md-12 col-xl-10">
                                <div class="card shadow-0 border rounded-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                                    <img src={"/images/" + hotel.hotel_image}
                                                        class="w-100" />
                                                    <a href="#!">
                                                        <div class="hover-overlay">
                                                            <div class="mask" style={{ "background-color": "rgba(253, 253, 253, 0.15)" }}></div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6 col-xl-6">
                                                <h5>{hotel.hotel_name}</h5>
                                                <p class="text-truncate mb-4 mb-md-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    </svg>
                                                    {hotel.hotel_address}
                                                </p>
                                                <p class="text-truncate mb-4 mb-md-0 mt-4">
                                                    {hotel.hotel_description}
                                                </p>


                                            </div>
                                            <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                <div class="d-flex flex-row align-items-center mb-1">
                                                    <h4 class="mb-1 me-1">$13.99</h4>
                                                    <span class="text-danger"><s>$20.99</s></span>
                                                </div>
                                                <h6 class="text-success">Room is available</h6>
                                                <div class="btn btn-primary btn-sm">
                                                    <Link to={"/details/"+hotel.hotel_id} className="nav-link">
                                                        Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    )
}

export default ListHotel