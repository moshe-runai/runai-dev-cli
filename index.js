import fs from 'fs';
import os from "os";
import k8s from '@kubernetes/client-node';


function getServerUrl(filepath) {
  try {
    const data = fs.readFileSync(filepath, 'utf8')
    const kc = new k8s.KubeConfig();
    kc.loadFromString(data);

    const servers = kc.getClusters()
      .filter(cluster => cluster.server.includes("kubernetes.docker") ? false : true)
      .map(cluster => cluster.server)

    return servers[0]
  } catch(error) {
    console.error("Couldn't find the file");
  }
}

function main() {
  const ignoreFiles = ["cache", "config"]
  try {
    const userHomeDir = os.homedir();
    const server = getServerUrl('/Users/moshepinhasi/.kube/config.e2e');
    console.log(server)
  } catch(error) {
    console.error(error);
  }
}

main()