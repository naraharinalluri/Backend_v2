const mongoose = require('mongoose');
const BusDetails = require('../models/bus')


mongoose.connect('mongodb+srv://user1:user11@cluster0-3etat.mongodb.net/booking-system?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

async function insertNewBus(busNumber, busType, totalSeats) {
    const bus = new BusDetails({
        busNumber,
        busType,
        totalSeats
    })
    const result = await bus.save()
    console.log(result)
}


async function insertNewService(busNumber, from, to, dep, arr, fare) {
    const bus = await BusDetails.findOne({ busNumber })
    bus.service = {
        from,
        to,
        dep,
        arr,
        fare
    }
    const result = await bus.save()
    console.log(result)
}


async function insertNewReservation(busNumber, seats) {
    const bus = await BusDetails.findOne({ busNumber })
    bus.reservation = {
        seats,
        isFull: false
    }
    const result = await bus.save()
    console.log(result)
}


// insertNewBus('TN09 AC U0001', 'VOLVO ', 40)
// insertNewReservation('TN09 AC U0001', [8, 6])
insertNewService('TN09 AC U0001', 'Hyderabad', 'Chennai', '22:00', '05:00', 680)





// async function searchServices(from, to, travelDate) {

//     let result = await Bus.find({ 'service.from': from, 'service.to': to, 'service.dep': travelDate })
//     console.log(result)

// }

// searchServices('BENGALORE','CHENNAI',new Date())


// async function updatePublisher(gameId) {
//     const game = await BusDetails.findById(gameId);
//     game.reservation.seats = '4', '5'
//     game.save();
// }

// updatePublisher('5ed0fecb31ff88153cecd483');