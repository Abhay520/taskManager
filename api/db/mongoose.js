//Handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/TaskManager').then(() => {
    console.log("Successfully connected to mongoDB");
}).catch((e) => {
    console.log("Error while attempting to connect to mongoDB");
    console.log(e);
})

module.exports = {
    mongoose
};