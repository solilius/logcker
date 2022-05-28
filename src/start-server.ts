import { getContainers, getDocker, listenToContainerLogs } from "./docker-actions";

export const startServer = () => {
  try {
    const docker = getDocker();
    const containers = getContainers(docker);
    for (const container in containers) {
      listenToContainerLogs({ docker, container });
    }

    console.log('Listening to all containers');
  } catch (error) {
    console.error('Failed to start up', error);
  }
}