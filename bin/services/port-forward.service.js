import { run } from "./command.service.js"
import { PORT_FORWARD_OPTIONS, PORT_OPTIONS } from "../config/questions.config.js"

function getBackendOptions(port = 7000) {
  return ["-n", "runai-backend", "port-forward", "service/runai-backend-backend", port]
}

function getDatabaseOptions(port = 5432) {
  return ["-n", "runai-backend", "port-forward", "service/runai-backend-postgresql", port]
}

function getTenantsManagerOptions(port = 8080) {
  return ["-n", "runai-backend", "port-forward", "service/unai-backend-tenants-manager", port]
}

function getThanosOptions(port = 9090) {
  return ["-n", "runai-backend", "port-forward", "service/runai-backend-thanos-query", port]
}

export function executePortForward(answers) {
  let port;
  if (answers.portOptions === PORT_OPTIONS.CUSTOM) {
    port = answers.customPort
  }

  switch (answers.portForward) {
    case PORT_FORWARD_OPTIONS.BACKEND: 
      run("kubectl", getBackendOptions(port))
      break;
    case PORT_FORWARD_OPTIONS.DATABASE: 
      run("kubectl", getDatabaseOptions(port))
      break;
    case PORT_FORWARD_OPTIONS.TENANTS_MANAGER: 
      run("kubectl", getTenantsManagerOptions(port))
      break;
    case PORT_FORWARD_OPTIONS.THANOS: 
      run("kubectl", getThanosOptions(port))
      break;
    case PORT_FORWARD_OPTIONS.EXIT: 
      break;
  }
}