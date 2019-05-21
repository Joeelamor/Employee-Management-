const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/EmployeeManagement", {
  useNewUrlParser: true
});
mongoose.set("useFindAndModify", false);

router.get("/get", (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) res.status(500).send(err);
    else res.status(200).json({ employees });
  });
});

router.get("/get/:id", (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) res.status(500).send(err);
    else res.status(200).json({ employee });
  });
});

router.post("/insert", (req, res) => {
  var employee = new Employee();
  employee.avatar = req.body.avatar;
  employee.name = req.body.name;
  employee.title = req.body.title;
  employee.sex = req.body.sex;
  employee.startDate = req.body.startDate;
  employee.officePhone = req.body.officePhone;
  employee.cellPhone = req.body.cellPhone;
  employee.sms = req.body.sms;
  employee.email = req.body.email;
  employee.managerId = req.body.managerId;
  employee.noOfDR = 0;

  employee.save((err, employee) => {
    if (err) res.status(500).send(err);
    else res.status(200).json({ employee });
  });
});

router.put("/update/:id", (req, res) => {
  var newEmployee = req.body;
  Employee.findOneAndUpdate(
    { _id: req.params.id },
    { $set: newEmployee },
    { new: true },
    (err, employee) => {
      if (err) res.status(500).send(err);
      else res.status(200).json({ employee });
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, employee) => {
    if (err) res.status(500).send(err);
    else res.status(200).json({ employee });
  });
});

module.exports = router;
