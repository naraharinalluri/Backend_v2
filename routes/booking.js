var express = require('express');
var router = express.Router();
var BusDetails = require('../models/bus')

router.post('/search', (req, res) => {
    BusDetails.find({ 'service.from': req.body.from, 'service.to': req.body.to }, (err, result) => {
        if (err) res.send(err)
        else res.json(result)
    })
})

router.post('/updateReserved', async (req, res) => {
    let q = req.query.q
    const seats = req.body
    const result = await BusDetails.updateOne({ busNumber: q }, {
        $push: { 'reservation.seats': seats }
    })
    res.json({ message: 'reserved', result })
})




module.exports = router;
