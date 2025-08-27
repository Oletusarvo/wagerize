import dotenv from 'dotenv';

dotenv.config();

export function socketConfig(io) {
  io.use((socket, next) => {
    const MAX_CLIENTS = process.env.MAX_CLIENTS;

    if (MAX_CLIENTS && io.engine.clientsCount >= parseInt(MAX_CLIENTS)) {
      return next(new Error('Server full!'));
    }

    next();
  });

  io.on('connection', socket => {
    console.log(`New connection! id: ${socket.id}`);
    socket.on('join_room', room => socket.join(room));
    socket.on('leave_room', room => socket.leave(room));
  });
}
