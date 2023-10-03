'use strict';

const eventEmitter = require('./eventPool.js');
const  handleVendor  = require('./vendor/index');
const  handleDriver  = require('./driver/index');

eventEmitter.on('vendor', (storeName) => {
  handleVendor(storeName); 
});

eventEmitter.on('pickup', (pickupEvent)=> {
    handleDriver(pickupEvent); 
  });

eventEmitter.emit('vendor', '1-206-flowers'); 
