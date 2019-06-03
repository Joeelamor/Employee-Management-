var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;

const db = mongoose.connection;
db.once("open", () => {
  console.log("mongodb connected.");
});

var EmployeeSchema = new Schema(
  {
    avatar: String,
    name: { type: String, required: true },
    title: String,
    sex: String,
    startDate: String,
    officePhone: String,
    cellPhone: String,
    sms: String,
    email: String,
    managerId: String,
    managerName: String,
    noOfDR: { type: String, default: "0" }
  },
  {
    collection: "Employee",
    versionKey: false
  }
);

EmployeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Employee", EmployeeSchema);
