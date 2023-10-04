'use strict';

const  handlePickup  = require('./handler');
const socket = require('../socket');

socket.on('pickup', (payload) => {
  handlePickup(payload);
});
