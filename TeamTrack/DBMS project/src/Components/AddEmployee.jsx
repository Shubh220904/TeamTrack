import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    FirstName: "",
    LastName:"",
    email: "",
    DOB:"",
    Gender:"",
    ContactNo:"",
    address: "",
    category_id: "",
    
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('FirstName', employee.FirstName);
    formData.append('LastName', employee.LastName);
    formData.append('email', employee.Email);
    formData.append('DOB', employee.DateOfBirth);
    formData.append('Gender', employee.Gender);
    formData.append('ContactNo', employee.ContactNumber);
    formData.append('address', employee.Address);
     // formData.append('image', employee.image);
    formData.append('category_id', employee.DepartmentID);

    axios.post('http://localhost:5173/auth/add_employee', formData)
    .then(result => {
        if(result.data.Status) {
            console.log("Reached...");
            navigate('/dashboard/employee')
        } else {
            alert("result.data.Error")
        }
    })
    .catch(err => console.log(err))
    alert("Failed to add employee. Please try again.");
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter  First Name"
              onChange={(e) =>
                setEmployee({ ...employee, FirstName: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setEmployee({ ...employee, LastName: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
           
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="DOB" className="form-label">
              Date Of Birth
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="DOB"
              placeholder="YYYY-MM-DD"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, DOB: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="Gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="Gender"
              placeholder="Enter Gender"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, Gender: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="ContactNo" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="ContactNo"
              placeholder="xxxxxxxxxx"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, ContactNo: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((Department) => {
                return <option value={Department.DepartmentID}>{Department.DepartmentName}</option>;
              })}
            </select>
          </div>
           
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
