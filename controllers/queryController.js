const Employee = require("../models/employeeModel");

const filterQueries = async (req, res) => {
  //Write your code here for sorting & pagination
  //1) For sorting sort salary from ascending to descending order
  //2) For Pagination set limit 5 as a default limit and default page is 1
  // Formulae to implementing pagination: (page - 1) * limit
  // For Sorting use    .sort('salary')
  const { page = 1, limit = 10, sortBy = "salary" } = req.query;

  try {
    const employees = await Employee.find()
      .sort(sortBy)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    res.status(200).json({
      employees
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { filterQueries };
