import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const PayrollPage = () => {
  const [payroll, setPayrollData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/payroll')
      .then(response => {
        if (response.data.Status) {
          setPayrollData(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error fetching payroll data:', error);
      });
  }, []);

  return (
    <div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
               
              <th>Employee ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Salary</th>
              <th>Deductions</th>
              <th>Netpay</th>

              <th>Action</th>

               
            </tr>
          </thead>
          <tbody>
            {payroll.map((e) => (
              <tr key={e.PayrollID}>
                <td>{e.EmployeeID}</td>
                <td>{e.Month}</td>
                <td>{e.Year}</td>
                <td>{e.Salary}</td>
                <td>{e.Deductions}</td>
                <td>{e.NetPay}</td>
                 
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

export default PayrollPage;
