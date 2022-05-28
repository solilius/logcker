import { Docker, ContainerInfo } from "dockerode";

export const getContainers = (docker: Docker) => docker.listContainers((err, containers): ContainerInfo[] => {
  if (err) throw new Error(err);
  if (containers?.length === 0) throw new Error("No Containers found");

  console.log(`[getContainers] got ${containers.length} containers`);

  return containers;
});
