const Employee = require("../models/employeeModel");

//Registering Employee into database
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employee" });
  }
};

//Get Employee From a Particular id
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Failed to get employee details" });
  }
};

//Updating Employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee details" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployees = await Employee.deleteMany({
      salary: { $gt: 10000 },
    });    
    if(!deletedEmployees){
      res.status(404).json({ error: "employees not found" });    
    }
    res.json(deletedEmployees);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employees" });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
