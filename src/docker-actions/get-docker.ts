import Docker from "dockerode";

const LOCAL_ADDRESS = 'http://127.0.0.1';
export const getDocker = (host: string = LOCAL_ADDRESS): Docker => {
  const docker = new Docker({ host });
  console.log('[getDocker] connected to local docker successfully');

  return docker;
}