// ########################################### //
// ############### - Logcker - ############### //
// ########################################### //

import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import { listenToContainers } from "./listen-to-containers";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: '*'}});
const port = process.env.PORT || 3003;


app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile('/Users/solelan/Projects/logcker/public/index.html');
});

io.on('connection', (socket) => console.log('user connected', socket));

server.listen(port, () => {
  console.log(`Server is up, listening on port: ${port}`);
  listenToContainers(io);
});
