import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post("/employee_login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM employee WHERE Email = ?";
    con.query(sql, [email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const employee = result[0];
            console.log(employee.Email);
            console.log(password);
            console.log(employee.EmployeeID);
            if (employee.EmployeeID == password) {
                const token = jwt.sign(
                    { role: "employee", email: employee.Email, id: employee.EmployeeID },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: employee.EmployeeID });
            } else {
                return res.json({ loginStatus: false, Error:"Wrong password" });
            }
        } else {
            return res.json({ loginStatus: false, Error:"Wrong email or password" });
        }
    });
});

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE EmployeeID = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result);
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
});

export { router as EmployeeRouter };
