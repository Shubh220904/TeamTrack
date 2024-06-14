import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LeaveDataPage = () => {
  const [leavedata, setLeaveData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/leavedata')
      .then(response => {
        if (response.data.Status) {
          setLeaveData(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching leave data:', error);
      });
  }, []);

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leavedata.map((e) => (
              <tr key={e.LeaveID}>
                <td>{e.EmployeeID}</td>
                <td>{e.LeaveType}</td>
                <td>{e.StartDate}</td>
                <td>{e.EndDate}</td>
                <td>{e.Reason}</td>
                <td>{e.Status}</td>
                 
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

export default LeaveDataPage;
