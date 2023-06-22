import { run } from "./command.service.js"
import { EDIT_DEPLOYMENT_OPTIONS } from "../config/questions.config.js"

const deploymentOptoins = ["-n", "runai-backend", "edit", "deploy"]

function getBackendOptions() {
  return [...deploymentOptoins, "runai-backend-backend"]
}

function getFrontendOptions() {
  return [...deploymentOptoins, "runai-backend-frontend"]
}

function getAssetServiceOptions() {
  return [...deploymentOptoins, "runai-backend-assets-service"]
}

function getPolicyServiceOptions() {
  return [...deploymentOptoins, "runai-backend-policy-service"]
}

export function executeEditDeployment(answers) {
  switch (answers.editDeployment) {
    case EDIT_DEPLOYMENT_OPTIONS.BACKEND: 
      run("kubectl", getBackendOptions())
      break;
    case EDIT_DEPLOYMENT_OPTIONS.FRONTEND: 
      run("kubectl", getFrontendOptions())
      break;
    case EDIT_DEPLOYMENT_OPTIONS.ASSET: 
      run("kubectl", getAssetServiceOptions())
      break;
    case EDIT_DEPLOYMENT_OPTIONS.POLICY: 
      run("kubectl", getPolicyServiceOptions())
      break;
    case EDIT_DEPLOYMENT_OPTIONS.EXIT: 
      break;
  }
}