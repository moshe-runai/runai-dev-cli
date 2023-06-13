export const ROOT_OPTIONS = {
  PORT_FORWARD: "Port Forward",
  EDIT_DEPLOYMENT: "Edit Deployment",
  KUBE_CONFIG: "Kube config",
  EXIT: "Exit",
};

export const PORT_FORWARD_OPTIONS = {
  BACKEND: "Backend",
  DATABASE: "Database",
  EXIT: "Exit",
};

export const PORT_OPTIONS = {
  DEFAULT: "Default",
  CUSTOM: "Custom",
};

export const EDIT_DEPLOYMENT_OPTIONS = {
  BACKEND: "Backend",
  FRONTEND: "Frontend",
  ASSET: "Asset service",
  EXIT: "Exit",
};

import { getKubeConfigListOptions } from "../services/kube-config.service.js";

const kubeConfigFiles = getKubeConfigListOptions();

export const questions = {
  main: {
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: [ROOT_OPTIONS.PORT_FORWARD, ROOT_OPTIONS.EDIT_DEPLOYMENT, ROOT_OPTIONS.KUBE_CONFIG, ROOT_OPTIONS.EXIT],
  },
  portForward: {
    type: "list",
    name: "portForward",
    message: ROOT_OPTIONS.PORT_FORWARD,
    choices: [PORT_FORWARD_OPTIONS.BACKEND, PORT_FORWARD_OPTIONS.DATABASE, PORT_FORWARD_OPTIONS.EXIT],
  },
  portOptions: {
    type: "list",
    name: "portOptions",
    message: "Which port to use?",
    choices: [PORT_OPTIONS.DEFAULT, PORT_OPTIONS.CUSTOM],
  },
  customPort: {
    type: "input",
    name: "customPort",
    message: "Enter a port",
  },
  editDeployment: {
    type: "list",
    name: "editDeployment",
    message: "Which service whould like to edit?",
    choices: [
      EDIT_DEPLOYMENT_OPTIONS.BACKEND,
      EDIT_DEPLOYMENT_OPTIONS.FRONTEND,
      EDIT_DEPLOYMENT_OPTIONS.ASSET,
      EDIT_DEPLOYMENT_OPTIONS.EXIT,
    ],
  },
  activateCluster: {
    type: "list",
    name: "activateCluster",
    message: "Which cluster whould like to activate?",
    choices: [...kubeConfigFiles, "Exit"],
  },
};
