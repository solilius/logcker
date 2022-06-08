import Docker, { ContainerInfo } from "dockerode";
import { Server } from "socket.io";
import { Log } from "./types/Log";
import _ from "lodash";

const SOCKET = "local";
const CONTAINERS_CHECK_INTERVAL = 1000 * 10;

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
    let containers = await docker.listContainers();
    containers.forEach((container) => {
      _listenToContainerLogs({ docker, container, socket: io });
    });

    setInterval(async () => {
      const newContainers = await docker.listContainers();
      // check for new containers to listen too
      const diff = _.differenceWith(
        newContainers,
        containers,
        (a, b) => a.Id === b.Id
      );
      diff.forEach((container) => {
        _listenToContainerLogs({ docker, container, socket: io });
      });
      containers = [...newContainers];
    }, CONTAINERS_CHECK_INTERVAL);
  } catch (error) {
    console.error("Failed to start up", error);
  }
};
