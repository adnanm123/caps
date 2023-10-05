'use strict';

const handlePickup = require('./handler');
const socket = require('../socket');

const driverName = 'driver-client'; // Provide a name for the driver

// Join a room with the driverName as the Driver ID
socket.emit('join', driverName);

// Subscribe to the appropriate Vendor
socket.emit('subscribe', ['acme-widgets', '1-800-flowers']);

// Fetch any messages added to the subscribed Queues upon connection
socket.emit('getAll', { clientId: driverName, event: 'pickup' });

socket.on('pickup', (payload) => {

  handlePickup(payload);

  // Trigger the 'received' event with the correct payload to acknowledge receipt
  const receivedPayload = {
    event: 'received',
    messageId: payload.orderId,
    clientId: driverName,
  };
  socket.emit('received', receivedPayload);
});
