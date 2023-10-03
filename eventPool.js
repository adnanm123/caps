'use strict';

const events = require('events');
const eventEmitter = new events.EventEmitter();

// Listen to all events and log their payloads
eventEmitter.on('pickup', (payload) => {
  logEvent('pickup', payload);
});

eventEmitter.on('in-transit', (payload) => {
  logEvent('in-transit', payload);
});

eventEmitter.on('delivered', (payload) => {
    logEvent('delivered', payload);
  });

function logEvent(event, payload) {
  const timestamp = new Date().toISOString();
  console.log(`EVENT: { 
    event: '${event}',
    time: '${timestamp}',
    payload: ${JSON.stringify(payload)}
  }`);
}

module.exports = eventEmitter;
