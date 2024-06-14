import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const RecruitmentPage = () => {
  const [recruitment, setRecruitmentData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/recruitment')
      .then(response => {
        if (response.data.Status) {
          setRecruitmentData(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching recruitment data:', error);
      });
  }, []);

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              
              <th>Job Title</th>
              <th>Department ID</th>
              <th>Posted Date</th>
              <th>Closing Date</th>
              <th>Job Description</th>
               
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recruitment.map((e) => (
              <tr key={e.JobID}>
                <td>{e.JobTitle}</td>
                <td>{e.DepartmentID}</td>
                <td>{e.PostedDate}</td>
                <td>{e.ClosingDate}</td>
                <td>{e.JobDescription}</td>
                 
                 
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

export default RecruitmentPage;
