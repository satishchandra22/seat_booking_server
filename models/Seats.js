const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    seatname : { type: String , required:true , unique:true},
    userId : { type: String ,default:"empty"},
},{timestamps:true});
module.exports = mongoose.model('Seats',SeatSchema);