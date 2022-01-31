// Controller for Companies API
import { validationResult } from 'express-validator';
import db from '../../models';
import { Request, Response } from 'express';
const Companies = db.companies;
const Employees = db.employees;

export const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const company = {
    name: req.body.name,
    email: req.body.description,
    phone: req.body.phone,
    website: req.body.website,
  };

  try {
    const data = await Companies.create(company);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred",
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const data = await Companies.findAll({ include: Employees });
    res.send(data);
  } catch (err) {
    console.log("i am showing errors");
    console.log(err);
    res.status(500).send({
      message: err.message || "Error occurred",
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await Companies.findByPk(id, { include: Employees });
    if (!data) {
      res.send({
        message: "No data found for give company id " + id,
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
    const num = await Companies.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Company was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update company with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating company with id=" + id,
    });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  const id = req.params.id;
  const transaction = await db.sequelize.transaction();

  try {
    await Employees.destroy({ where: { CompanyId: id } });
    const num = await Companies.destroy({
      where: { id },
    });
    if (num <= 0) {
      throw "Can not delete company with id = " + id;
    }

    await transaction.commit();
    res.send({ message: `Company with id = ${id} was deleted successfully!` });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: "Could not delete company with id=" + id,
    });
  }
};

