//This to handle the likes and dislikes

const Models = require('./models');

const likeTraining = (user_id, Training_id, done) => {
    findTrainingById(Training_id, (foundTraining) => {
        if (foundTraining == null) {
            done(false);
        } else {
            findUserById(user_id, (foundUser) => {
                if (foundUser == null) {
                    done(null);
                } else {
                    if (foundUser.prefered.includes(foundTraining)) {
                        done(true);
                    } else {
                        foundUser.prefered.push(foundTraining);
                        foundUser.save((err) => {
                            if (err) done(false);
                            done(true);
                        });
                    }
                }
            })
        }
    })
}

const dislikeTraining = (user_id, Training_id, done) => {
    findShopById(Training_id, (foundTraining) => {
        if (foundTraining == null) {
            done(false);
        } else {
            findUserById(user_id, (foundUser) => {
                if (foundUser == null) {
                    done(null);
                } else {
                    foundUser.prefered = foundUser.prefered.filter((ele) => ele._id != Training_id);
                    foundUser.save((err) => {
                        if (err) done(false);
                        done(true);
                    });
                }
            })
        }
    })
}

const allTrainings = (done) => {
    //This needs to be optimized, I dont want to send all the shops data
    //it is too much
    Models
        .Training
        .find({})
        .limit(40)
        .exec((err, data) => {
            if (err) {
                console.log('err retrieving all Trainings', err);
                done(null);
            } else {
                console.log('success retrieving trainings data');
                done(data);
            }
        });
}

const favTraining = (user_id, done) => {
    Models
        .User
        .findById(user_id)
        .populate('prefered')
        .exec((err, data) => {
            if (err) {
                console.log('err retrieving fav Training', err);
                done(null);
            }
            else {
                console.log('sending user favourite Trainings');
                done(data.prefered);
            }
        });
}

const findTrainingById = (Training_id, done) => {
    Models
        .Training
        .findById(Training_id, (err, found) => {
            if (err) {
                console.log('err finding Training')
                done(null);
            } else {
                console.log('found Training', found);
                done(found);
            }
        });
}

const findUserById = (user_id, done) => {
    Models
        .User
        .findById(user_id, (err, found) => {
            if (err) {
                console.log('err finding user', err);
                done(null);
            } else {
                console.log('found the user', found);
                done(found);
            }
        })
}

exports.favTraining = favTraining;
exports.likeTraining = likeTraining;
exports.dislikeTraining = dislikeTraining;
exports.allTrainings = allTrainings;