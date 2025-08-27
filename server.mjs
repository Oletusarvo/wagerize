import { createServer } from 'http';
import { Server } from 'socket.io';
import { parse } from 'url';
import next from 'next';
import { socketConfig } from './src/socketConfig.mjs';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, turbopack: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  const io = new Server(server);
  global.ioServer = io;
  socketConfig(io);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
