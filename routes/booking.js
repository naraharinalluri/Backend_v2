var express = require('express');
var router = express.Router();
var BusDetails = require('../models/bus')

router.post('/search', (req, res) => {
    BusDetails.find({ 'service.from': req.body.from, 'service.to': req.body.to }, (err, result) => {
        if (err) res.send(err)
        else res.json(result)
    })
})



















module.exports = router;
