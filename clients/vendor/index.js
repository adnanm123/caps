'use strict';

const { handleDelivery, createPickup } = require('./handler');
const socket = require('../socket');

const storeName = '1-206-flower';

// Join a room with the storeName as the Vendor ID
socket.emit('join', storeName);

// Simulate new customer orders at regular intervals
const orderInterval = setInterval(() => {
  const pickupOrder = createPickup(storeName);
  socket.emit('pickup', pickupOrder);
}, 5000); // Simulate orders every 5 seconds 


socket.on('delivered', (payload) => {
  handleDelivery(payload);
});
