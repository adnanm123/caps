const handleDriver = require('./handler'); 
const eventEmitter = require('../eventPool'); 

jest.useFakeTimers();

// Mock the console.log method to capture logs
console.log = jest.fn();

// Mock the eventEmitter.emit method
eventEmitter.emit = jest.fn();

describe('handleDriver', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test case
  });

  it('should log "DRIVER: picked up" message and emit "in-transit" event', () => {
    const pickupEvent = {
      orderId: '12345',
      store: 'Test Store',
      customer: 'Test Customer',
      address: 'Test Address',
    };

    handleDriver(pickupEvent);

    // Check if the log message is correct
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 12345');

    // Check if the "in-transit" event is emitted with the correct payload
    expect(eventEmitter.emit).toHaveBeenCalledWith('in-transit', {
      store: 'Test Store',
      orderId: '12345',
      customer: 'Test Customer',
      address: 'Test Address',
    });
  });

  it('should log "DRIVER: delivered" message and emit "delivered" event after a delay', () => {
    const pickupEvent = {
      orderId: '54321',
      store: 'Another Store',
      customer: 'Another Customer',
      address: 'Another Address',
    };

    handleDriver(pickupEvent);

    // Check if the "delivered" event is not emitted immediately
    expect(eventEmitter.emit).not.toHaveBeenCalledWith('delivered');

    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered 54321');

    // Fast-forward time by 100 milliseconds to trigger the "delivered" event
    jest.advanceTimersByTime(100);

    // Check if the "delivered" event is emitted with the correct payload after the delay
    expect(eventEmitter.emit).toHaveBeenCalledWith('delivered', {
      store: 'Another Store',
      orderId: '54321',
      customer: 'Another Customer',
      address: 'Another Address',
    });
  });
});
