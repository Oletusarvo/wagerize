import { Server } from 'socket.io';
export function socketConfig(server) {
  const io = new Server(server);
  global.io = io;

  io.on('connection', socket => {
    console.log(`New connection! id: ${socket.id}`);
    socket.on('join_room', room => socket.join(room));
    socket.on('leave_room', room => socket.leave(room));
  });
}
