CREATE TABLE LeaveData (
    LeaveID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT,
    LeaveType VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    Reason VARCHAR(255),
    Status VARCHAR(255),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Department (
    DepartmentID INT AUTO_INCREMENT PRIMARY KEY,
    DepartmentName VARCHAR(255)
);

CREATE TABLE Employee (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    ContactNumber VARCHAR(15) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NOT NULL
);

ALTER TABLE Employee
ADD COLUMN DepartmentID INT,
ADD CONSTRAINT fk_department
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID);


CREATE TABLE Attendance (
    AttendanceID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT,
    Date DATE,
    ClockInTime TIME,
    ClockOutTime TIME,
    Status VARCHAR(255),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Payroll (
    PayrollID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT,
    Month INT,
    Year INT,
    Salary DECIMAL(10, 2),
    Deductions DECIMAL(10, 2),
    NetPay DECIMAL(10, 2),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);


CREATE TABLE PerformanceReview (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT,
    ReviewDate DATE,
    ReviewerID INT,
    Rating INT,
    Comments TEXT,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ReviewerID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Training (
    TrainingID INT AUTO_INCREMENT PRIMARY KEY,
    TrainingName VARCHAR(255),
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    TrainerID INT,
    FOREIGN KEY (TrainerID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Recruitment (
    JobID INT AUTO_INCREMENT PRIMARY KEY,
    JobTitle VARCHAR(255),
    DepartmentID INT,
    PostedDate DATE,
    ClosingDate DATE,
    JobDescription TEXT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);
