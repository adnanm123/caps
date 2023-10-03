'use strict';

const Chance = require('chance');
const chance = new Chance();

const eventEmitter = require('../eventPool');
const handleDriver = require('./handler');
const handleVendor = require('./handler'); 
jest.useFakeTimers();

// Mock the console.log method to capture logs
console.log = jest.fn();

// Mock the eventEmitter.emit method
eventEmitter.emit = jest.fn();

describe('handleVendor', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test case
  });

  it('should emit "pickup" event with correct payload', () => {
    const storeName = 'Test Store';

    handleVendor(storeName);

    // Check if the "pickup" event is emitted with the correct payload
    expect(eventEmitter.emit).toHaveBeenCalledWith('pickup', expect.objectContaining({
      store: 'Test Store',
      orderId: expect.any(String),
      customer: expect.any(String),
      address: expect.any(String),
    }));
  });
  
  it('should not log "Thank you for your order" message when "delivered" event is emitted with a different orderId', () => {
    const storeName = 'Test Store';
    const orderId = '12345';
    const customer = 'Test Customer';

    handleVendor(storeName);

    // Simulate the "delivered" event with a different orderId
    eventEmitter.emit('delivered', {
      orderId: '54321', // Different orderId
      // Add other properties as needed
    });

    // Check if the log message is not called
    expect(console.log).not.toHaveBeenCalledWith(`Thank you for your order ${customer}`);
  });
});
