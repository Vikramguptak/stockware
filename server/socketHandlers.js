import { Server } from 'socket.io';
import Warehouse from './models/Warehouse.js';
import Message from './models/Message.js';

export const setupSocketHandlers = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  const userSockets = new Map();

  io.on('connection', (socket) => {
    console.log('A user connected');
    const userId = socket.handshake.query.userId;
    userSockets.set(userId, socket);

    socket.on('sendMessage', async ({ recipientId, message }) => {
      const recipientSocket = userSockets.get(recipientId);
      if (recipientSocket) {
        recipientSocket.emit('message', message);
      }

      // Save the message to the database
      try {
        const newMessage = new Message({
          sender: message.sender,
          recipient: recipientId,
          content: message.content,
        });
        await newMessage.save();
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      userSockets.delete(userId);
    });
  });

  return io;
};

export const emitWarehouseUpdate = async (io, warehouseId) => {
  const warehouse = await Warehouse.findById(warehouseId);
  if (warehouse) {
    io.to(`warehouse_${warehouseId}`).emit('warehouseUpdate', warehouse);
  }
};