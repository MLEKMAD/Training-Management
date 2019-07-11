const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/united", { useNewUrlParser: true });

let TrainingProto = new Schema({
    id:Number,
    name: String,
    collaborator: String,
    T_date: Date,
   rating: Number
});

let Training = mongoose.model('Trainings', TrainingProto);

let userProto = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    type:{ type: String, required: true},
    FirstName:{ type: String, required: true},
    LastName:{ type: String, required: true},
    prefered: [{ type: Schema.Types.ObjectId, ref: 'Trainings' }]
})

let User = mongoose.model('users', userProto);

exports.Training = Training;
exports.User = User;