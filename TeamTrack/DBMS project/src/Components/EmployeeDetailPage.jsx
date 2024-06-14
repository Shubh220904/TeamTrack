import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5173/employee/${id}`)
      .then(response => {
        if (response.data.Status) {
          setEmployee(response.data.Result[0]);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Employee Detail</h2>
      {employee ? (
        <div>
          <p>Name: {employee.FirstName} {employee.LastName}</p>
          <p>Email: {employee.Email}</p>
          <p>Date of Birth: {new Date(employee.DateOfBirth).toLocaleDateString()}</p>
          <p>Gender: {employee.Gender}</p>
          <p>Contact Number: {employee.ContactNumber}</p>
          <p>Address: {employee.Address}</p>
          <p>Category ID: {employee.DepartmentID}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployeeDetailPage;
