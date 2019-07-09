const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

let Trainings = new Schema({
    id:int,
    name: String,
    collaborator: String,
    T_date: Date,
   rating: int
});

let Training = mongoose.model('Trainings', Trainings);

let userProto = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    type:{ type: String, required: true},
    FirstN:{ type: String, required: true},
    LastN:{ type: String, required: true},
    prefered: [{ type: Schema.Types.ObjectId, ref: 'Trainings' }]
})

let User = mongoose.model('users', userProto);

exports.Training = Training;
exports.User = User;