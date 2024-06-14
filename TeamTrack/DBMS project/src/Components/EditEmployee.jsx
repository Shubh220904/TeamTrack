import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        email: "",
        address: "",
        departmentID: "",
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setDepartments(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));

        axios.get(`http://localhost:3000/auth/employee/${id}`)
            .then(result => {
                const empData = result.data.Result[0];
                setEmployee({
                    firstName: empData.FirstName,
                    lastName: empData.LastName,
                    dateOfBirth: empData.DateOfBirth,
                    gender: empData.Gender,
                    contactNumber: empData.ContactNumber,
                    email: empData.Email,
                    address: empData.Address,
                    departmentID: empData.DepartmentID,
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };
    
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputFirstName"
                            placeholder="First Name"
                            value={employee.FirstName}
                            onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputLastName"
                            placeholder="Last Name"
                            value={employee.lastName}
                            onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputDateOfBirth" className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            id="inputDateOfBirth"
                            value={employee.dateOfBirth}
                            onChange={(e) => setEmployee({ ...employee, dateOfBirth: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputGender" className="form-label">Gender</label>
                        <select
                            className="form-select"
                            id="inputGender"
                            value={employee.gender}
                            onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputContactNumber" className="form-label">Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputContactNumber"
                            placeholder="Contact Number"
                            value={employee.contactNumber}
                            onChange={(e) => setEmployee({ ...employee, contactNumber: e.target.value })}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Email"
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="Address"
                            value={employee.address}
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputDepartmentID" className="form-label">Department</label>
                        <select
                            className="form-select"
                            id="inputDepartmentID"
                            value={employee.departmentID}
                            onChange={(e) => setEmployee({ ...employee, departmentID: e.target.value })}
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept.DepartmentID} value={dept.DepartmentID}>{dept.DepartmentName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
