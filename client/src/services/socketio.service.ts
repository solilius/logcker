import { io, Socket } from 'socket.io-client';

class SocketioService {
  socket: Socket | undefined;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://0.0.0.0:3003');
    this.socket?.on('local', (msg)=> console.log(msg));
  }

  disconect() {
    this.socket?.disconnect();
  }
}

export const SocketConnection =  new SocketioService();