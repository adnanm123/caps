// const express = require('express');
const { Server } = require('socket.io');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
// const app = express();

let server = new Server(PORT); // as soon as this line runs, we have something to connect to.

// namespace server
let capsServer = server.of('/caps');

function logger(type, payload) {

    const event = {
      event: type,
      time: new Date(),
      payload,
    }
  
    console.log(`EVENT`, event);
  }

capsServer.on('connection', (socket) => {
  console.log(`Client connected to 'caps' namespace: ${socket.id}`);

  // Handle joining rooms based on client information (Vendor ID)
  socket.on('join', (vendorId) => {
    socket.join(vendorId); // Vendor ID as the room name
    console.log(`Socket ${socket.id} joined room: ${vendorId}`);
  });

  socket.on('pickup', (payload) => {
    logger('pickup', payload);
    
    // Broadcast 'pickup' event to all clients in the same room (Driver)
    capsServer.to(payload.store).emit('pickup', payload);
    
    // Emit 'pickup' event to all other clients except the sender (Global Event Pool)
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    
    // Emit 'in-transit' event only to Vendors in the same room
    capsServer.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    
    // Emit 'delivered' event only to Vendors in the same room
    capsServer.to(payload.store).emit('delivered', payload);
  });
});
