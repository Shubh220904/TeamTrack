import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const AttendancePage = () => {
  const [attendance, setAttendanceData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/attendance')
      .then(response => {
        if (response.data.Status) {
          setAttendanceData(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
               
              <th>Employee ID</th>
              <th>Date</th>
              <th>Clock IN</th>
              <th>Clock OUT</th>
              <th>Status</th>
              <th>Action</th>

               
            </tr>
          </thead>
          <tbody>
            {attendance.map((e) => (
              <tr key={e.attendanceID}>
                <td>{e.EmployeeID}</td>
                <td>{e.Date}</td>
                <td>{e.ClockInTime}</td>
                <td>{e.ClockOutTime}</td>
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

export default AttendancePage;
