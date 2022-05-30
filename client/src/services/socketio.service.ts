import { io, Socket } from 'socket.io-client';
import LogsStore  from '../store';

const SERVER_ADDRESS = 'http://0.0.0.0:3003';

class SocketioService {
  socket: Socket | undefined;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(SERVER_ADDRESS);
    this.socket?.on('local', (log)=> {
      LogsStore.dispatch('processLog', log); 
    });
  }

  disconect() {
    this.socket?.disconnect();
  }
}

export const SocketConnection =  new SocketioService();