import { validationResult } from 'express-validator';
import db from '../../models';
import { Request, Response } from 'express';
const Employees = db.employees;
const Companies = db.companies;

export const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const companyId = req.params.companyId;

  try {
    const company = await Companies.findByPk(companyId);

    if (!company || company.length === 0) {
      return res.status(400).send({
        message: "No company found for given id " + companyId,
      });
    }

    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.description,
      phone: req.body.phone,
      CompanyId: companyId,
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
  }
};
export const findAll = async (req: Request, res: Response) => {
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

export const findOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await Employees.findByPk(id);
    if (!data) {
      res.send({
        message: "No data found for give employee id " + id,
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

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const num = await Employees.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Employee was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update employee with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating employee with id=" + id,
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const num = await Employees.destroy({ where: { id } });
    if (num <= 0) {
      throw "Can not delete employee with id = " + id;
    }

    res.send({ message: `Employee with id = ${id} was deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete employee with id=" + id,
    });
  }
};

