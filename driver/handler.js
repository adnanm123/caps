'use strict';

const eventEmitter = require('../eventPool'); 

function handleDriver(pickupEvent) {

    const orderId = pickupEvent.orderId;
    console.log(`DRIVER: picked up ${orderId}`); 

const inTransitEvent = {
    store: pickupEvent.store,
    orderId: pickupEvent.orderId,
    customer: pickupEvent.customer,
    address: pickupEvent.address,
  };

eventEmitter.emit('in-transit', inTransitEvent);

console.log(`DRIVER: delivered ${orderId}`);

setTimeout(() => {
    eventEmitter.emit('delivered', inTransitEvent); 
  }, 100); 
}


module.exports = handleDriver;
