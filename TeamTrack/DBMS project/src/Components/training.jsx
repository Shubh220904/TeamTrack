import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const TrainingPage = () => {
  const [training, setTrainingData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/training')
      .then(response => {
        if (response.data.Status) {
          setTrainingData(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching training data:', error);
      });
  }, []);

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
               
              <th>Training Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>trainer ID</th>
               

              <th>Action</th>

               
            </tr>
          </thead>
          <tbody>
            {training.map((e) => (
              <tr key={e.TrainingID}>
                <td>{e.TrainingName}</td>
                <td>{e.Description}</td>
                <td>{e.StartDate}</td>
                <td>{e.EndDate}</td>
                <td>{e.TrainerID}</td>
                 
                 
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

export default TrainingPage;
