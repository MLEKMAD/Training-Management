const router = require('express').Router();
const actionsManager = require('../db/actions');

router.get('/', (req, res) => {
    actionsManager.allTrainings((Trainings)=>{
        if(Trainings == null){
            res.writeHead(500)
        }else{
            res.json(Trainings);
        }
    })
});

module.exports = router;