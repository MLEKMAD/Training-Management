const router = require('express').Router();
const accountsManager = require('../db/accounts');
const actionsManager = require('../db/actions');

router.get('/:id/Trainings', (req, res) => {
    //return all the prefered shops by a user
    const user_id = req.params.id;
    actionsManager.favTraining(user_id,(data)=>{
        if(data == null){
            res.json({error:'error retrieving favorite trainings'});
        }else{
            res.json(data);
        }
    })
});

router.put('/:id_user/like/:id_Training', (req, res) => {
    //Add the training with id_shop to the prefered list of the user
    const user_id = req.params.id_user;
    const Training_id = req.params.id_Training;
    actionsManager.likeTraining(user_id, Training_id, (success) => {
        if (success) {
            res.json({success:'Added the training to the user'});
        } else {
            res.json({error:'Failed to like the training to the user'});
        }
    })
});

router.put('/:id_user/dislike/:id_training', (req, res) => {
    //Remove the shop with id_shop from the prefered list of the user
    const user_id = req.params.id_user;
    const Training_id = req.params.id_Training;
    actionsManager.dislikeTraining(user_id, Training_id, (success) => {
        if (success) {
            res.writeHead(200);
        } else {
            res.writeHead(500);
        }
    })
});

router.post('/sign-in', (req, res) => {
    //Return a user or an error.
    const { body: { email, password } } = req;
    accountsManager.signIn(email, password, (user)=>{
        if(user == null){
            res.json({error:'Failed Login'});
        }else{
            res.json(user);
        }
    });
});

router.post('/sign-up', (req, res) => {
    //Sign up a user
    const { body: { email, password,FirstN,LastN,Type } } = req;
    accountsManager.signUp(email, password,FirstN,LastN,Type, (user) => {
        if (user == null) {
            res.json({ error: 'Failed sign up' });
        } else {
            res.json(user);
        }
    });
});

module.exports = router;