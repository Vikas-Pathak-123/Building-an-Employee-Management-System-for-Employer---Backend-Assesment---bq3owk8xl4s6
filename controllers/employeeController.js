const Employee = require("../models/employeeModel");

//Registering Employee into database
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json({newEmployee:savedEmployee});
  } catch (err) {
    res.status(500).json({ error: "Failed to create employee" });
  }
};

//Get Employee From a Particular id
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    res.json(employee);
    
  } catch (err) {
    res.status(404).json({ error: "Employee not found"});
  }
};

//Updating Employee
const updateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({message: "Employee details updated successfully"});
  } catch (err) {
    res.status(404).json({error: "Employee not found" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteMany({
      salary: { $gt: 10000 },
    });    
    res.json({message: "employees deleted successfully"});
  } catch (err) {
    res.status(404).json({ error: "employees not found" });    
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
