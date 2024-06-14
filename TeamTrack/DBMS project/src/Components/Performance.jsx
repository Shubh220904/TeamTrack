import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const PerformancePage = () => {
  const [performancereview, setPerformanceData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/performance')
      .then(response => {
        if (response.data.Status) {
          setPerformanceData(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching performance data:', error);
      });
  }, []);

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              
              <th>Employee ID</th>
              <th>Review Date</th>
              <th>Reviewer ID</th>
              <th>Rating</th>
              <th>Comments</th>
               
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {performancereview.map((e) => (
              <tr key={e.ReviewID}>
                <td>{e.EmployeeID}</td>
                <td>{e.ReviewDate}</td>
                <td>{e.ReviewerID}</td>
                <td>{e.Rating}</td>
                <td>{e.Comments}</td>
                 
                 
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

export default PerformancePage;
