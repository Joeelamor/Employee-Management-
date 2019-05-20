var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const db = mongoose.connection;
db.once("open", () => {
    console.log("mongodb connected.")
});

var UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        title: String,
        sex: String,
        age: String,
        password: {type: String, required: true}
    },
    {
        collection: 'User',
        versionKey: false
    });

module.exports = mongoose.model('User', UserSchema);
