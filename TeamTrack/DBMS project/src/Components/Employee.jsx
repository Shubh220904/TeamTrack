import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          // Convert DateOfBirth from Date to string format
          const formattedEmployees = result.data.Result.map((emp) => ({
            ...emp,
            DateOfBirth: new Date(emp.DateOfBirth).toLocaleDateString(),
          }));
          setEmployee(formattedEmployees);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:3000/auth/delete_employee/' + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const handleGetDetails = (id) => {
    // Perform actions to get details of a specific employee
    console.log("Fetching details of employee with ID:", id);
    // Example: You can navigate to a separate page to display employee details
    // navigate(`/dashboard/employee/${id}`);
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <button
        className="btn btn-primary ms-3"
        onClick={fetchEmployeeData}
      >
        Refresh Employee Data
      </button>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Department ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.EmployeeID}>
                <td>{e.FirstName}</td>
                <td>{e.LastName}</td>
                <td>{e.DateOfBirth}</td>
                <td>{e.Gender}</td>
                <td>{e.ContactNumber}</td>
                <td>{e.Email}</td>
                <td>{e.Address}</td>
                <td>{e.DepartmentID}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.EmployeeID}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.EmployeeID)}
                  >
                    Delete
                  </button>
                   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
