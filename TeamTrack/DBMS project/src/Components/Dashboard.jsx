import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) { 
          localStorage.removeItem("valid")
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* Logo or Site Name */}
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Employee Management System
              </span>
            </Link>
            {/* Main Menu */}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/attendance"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar-check ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Attendance</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leavedata"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-journal-richtext ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave Data</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/training"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-book ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Training</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/performance"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-graph-up ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Performance</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/payroll"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-cash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Payroll</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/recruitment"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person-plus ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Recruitment</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
