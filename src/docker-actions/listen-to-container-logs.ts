import { Docker, ContainerInfo } from "dockerode";
interface Options {
  docker: Docker;
  container: ContainerInfo;
}

export const listenToContainerLogs = ({ docker, container, }: Options) =>
  docker
    .getContainer(container.Id)
    .attach({ stream: true, stdout: true, stderr: true }, (err, stream) => {
      stream.on("data", (data) => {
        console.log(data);
      });
    });
