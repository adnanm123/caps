'use strict';

const Chance = require('chance');
const chance = new Chance(); 

const eventEmitter = require('../eventPool'); 

function handleVendor(storeName) {
  const orderId = chance.guid();
  const customer = chance.name();
  const address = chance.address();

  const pickupEvent = {
    store: storeName,
    orderId: orderId,
    customer: customer,
    address: address,
  };

  eventEmitter.emit('pickup', pickupEvent);

  eventEmitter.on('delivered', (deliveredEvent) => {
    if (deliveredEvent.orderId === orderId) {
      console.log(`Thank you for your order ${customer}`);
    }
  });
}

module.exports = handleVendor;
