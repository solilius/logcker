import Docker, { ContainerInfo } from "dockerode";
import { Server } from "socket.io";
import { Log } from "./types/Log";
const SOCKET = "local";

interface Options {
  docker: Docker;
  container: ContainerInfo;
  socket: Server;
}

const _listenToContainerLogs = ({ docker, container, socket }: Options) => {
  const containerName =
    container?.Labels["com.docker.compose.service"] || container?.Names[0];

  try {
    docker
      .getContainer(container.Id)
      .attach({ stream: true, stdout: true, stderr: true }, (err, stream) => {
        stream?.on("data", (data) => {
          const log: Log = {
            timestamp: Date.now(),
            origin: containerName,
            data: Buffer.from(data).toString().trim(),
          };
          socket.emit(SOCKET, log);
          console.log(log);
        });
      });
  } catch (error) {
    console.error(`Failed connecting to ${containerName}`);
  }
};

export const listenToContainers = async (io) => {
  try {
    const docker = new Docker();
    const containers = await docker.listContainers();

    containers.forEach((container) => {
      _listenToContainerLogs({ docker, container, socket: io });
    });
  } catch (error) {
    console.error("Failed to start up", error);
  }
};
