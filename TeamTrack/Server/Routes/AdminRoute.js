import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM department";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    // Fetch the current count of departments
    const countQuery = "SELECT COUNT(*) AS departmentCount FROM department";
    con.query(countQuery, (err, countResult) => {
        if (err) return res.json({ Status: false, Error: "Error counting departments" });

        // Calculate the new DepartmentID by adding one to the current count
        const newDepartmentID = countResult[0].departmentCount + 1;

        // Insert the new department into the database
        const insertQuery = "INSERT INTO department (DepartmentID, DepartmentName) VALUES (?, ?)";
        con.query(insertQuery, [newDepartmentID, req.body.category], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Error inserting department" });
            return res.json({ Status: true });
        });
    });
});


// image upload 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Public/Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage: storage
// })
// end imag eupload 

router.post('/add_employee', (req, res) => {
    const Countemp = "SELECT COUNT(*) AS employeeCount FROM employee";
    con.query(Countemp, (err, countResult) => {
        if (err) return res.json({ Status: false, Error: "Error counting employees" });

        // Calculate the new EmployeeID by adding one to the current count
        const newEmployeeID = countResult[0].employeecount + 1;
        const sql = `INSERT INTO employee 
        (EmployeeID, FirstName, LastName, Email, DateOfBirth, Gender, ContactNumber, Address, DepartmentID) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            newEmployeeID,
            req.body.FirstName,
            req.body.LastName,
            req.body.email,
            req.body.DOB,
            req.body.Gender,
            req.body.ContactNo,
            req.body.address,
            req.body.category_id
        ];
        con.query(sql, values, (err, result) => {
            if(err) return res.json({ Status: false, Error: err });
            return res.json({ Status: true });
        });
    });
});


router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE EmployeeID = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        SET FirstName = ?, LastName = ?, DateOfBirth = ?, Gender = ?, 
            ContactNumber = ?, Email = ?, Address = ?, DepartmentID = ?
        WHERE EmployeeID = ?`;
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.dateOfBirth,
        req.body.gender,
        req.body.contactNumber,
        req.body.email,
        req.body.address,
        req.body.departmentID,
        id
    ];
    con.query(sql, values, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error: " + err});
        return res.json({Status: true, Result: result});
    });
});


router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where EmployeeID = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(AdminID) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(EmployeeID) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(Salary) as salaryOFEmp from payroll";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/attendance', (req, res) => {
    const sql = "SELECT * FROM attendance";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});

router.get('/leavedata', (req, res) => {
    const sql = "SELECT * FROM leavedata";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});

router.get('/training', (req, res) => {
    const sql = "SELECT * FROM training";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});

router.get('/performance', (req, res) => {
    const sql = "SELECT * FROM performancereview";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});


router.get('/payroll', (req, res) => {
    const sql = "SELECT * FROM payroll";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});


router.get('/recruitment', (req, res) => {
    const sql = "SELECT * FROM recruitment";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
