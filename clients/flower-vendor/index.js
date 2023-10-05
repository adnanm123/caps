'use strict';

const { handleDelivery, createPickup } = require('./handler');
const socket = require('../socket');

const storeName = '1-800-flowers'; 

// Join a room with the storeName as the Vendor ID
socket.emit('join', storeName);

// Simulate new customer orders at regular intervals
const orderInterval = setInterval(() => {
  const pickupOrder = createPickup(storeName);
  socket.emit('pickup', pickupOrder);
}, 5000); 

// Subscribe to the delivered Queue
socket.emit('getAll', { clientId: storeName, event: 'delivered' });

socket.on('delivered', (payload) => {
 
  handleDelivery(payload);

  // Trigger the 'received' event with the correct payload to acknowledge receipt
  const receivedPayload = {
    event: 'received',
    messageId: payload.orderId,
    clientId: storeName,
  };
  socket.emit('received', receivedPayload);
});
