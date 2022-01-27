// Controller for Employees.API
const { validationResult } = require("express-validator");
const db = require("../../models");
const Employees = db.employees;
const Companies = db.companies;

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const companyId = req.params.companyId;
  console.log('company id is ');
  console.log(companyId);

  try {
    const company = await Companies.findByPk(companyId);

    console.log('company is');
    console.log(company);

    if (!company) {
      return res.status(400).send({
        message: "No company found for given id " + companyId,
      });
    }

    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.description,
      phone: req.body.phone,
      CompanyId: companyId
    };

    try {
      const data = await Employees.create(employee);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Error occurred",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "No company found for given id " + companyId,
    });
  };
}
exports.findAll = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const data = await Employees.findAll({ include: Companies });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred",
    });
  }
};

exports.findOne = async (req, res) => {
  const companyId = req.params.companyId;
  const id = req.params.id;
  try {
    const data = await Employees.findByPk(id);
    if (!data) {
      res.send({
        message: "No data found for give employee id " + id
      });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Employees.update(req.body, {
      where: { id: id }
    });
    if (num == 1) {
      res.send({
        message: "Employee was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update employee with id=${id}.`
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message: "Error updating employee with id=" + id
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Employees.destroy({ where: { id } });
    if (num <= 0) {
      throw "Can not delete employee with id = " + id;
    }

    res.send({ message: `Employee with id = ${id} was deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete employee with id=" + id
    });
  }
}