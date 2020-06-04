var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'You made it to the secure route'
    })
});


module.exports = router;
