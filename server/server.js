const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const TrainingsRoutes = require('./routes/Trainings');

const app = express();
const PORT = 3002;

//Configuration of the app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes of the App
app.use('/api/Trainings', TrainingsRoutes);
app.use('/api/users', usersRoutes);

// listen for requests :)
const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
