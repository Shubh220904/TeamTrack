DELIMITER //

CREATE PROCEDURE GetEmployeesByDepartment(IN deptID INT)
BEGIN
    SELECT *
    FROM Employee
    WHERE DepartmentID = deptID;
END //

DELIMITER ;



CREATE TRIGGER update_last_modified_date
BEFORE UPDATE ON Employee
FOR EACH ROW
SET NEW.LastModifiedDate = NOW();

DECLARE dep_id INT DEFAULT 5;
SELECT SUM(Salary) AS TotalSalary
FROM (
    SELECT Salary
    FROM GetEmployeesByDepartmentId(dep_id)  
) AS DepartmentEmployees;


SELECT *
FROM Employee USE INDEX (idx_department_id)
WHERE DepartmentID = 5;
