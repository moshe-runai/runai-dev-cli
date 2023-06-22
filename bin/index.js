#! /usr/bin/env node

import boxen from "boxen";
import inquirer from "inquirer";
import { questions, ROOT_OPTIONS, PORT_OPTIONS, PORT_FORWARD_OPTIONS } from "./config/questions.config.js";
import { executePortForward } from "./services/port-forward.service.js";
import { executeEditDeployment } from "./services/edit-deploy.service.js";
import { activateConfig, listEnvs } from "./services/kube-config.service.js";

const helloMessage = boxen("Usage: runai-dev", {
  title: "runai-dev cli",
  titleAlignment: "center",
  padding: 1,
  borderColor: "green",
  dimBorder: true,
});
console.info(helloMessage);

inquirer
  .prompt([
    questions.main,
    {
      ...questions.portForward,
      when: (answers) => answers.main === ROOT_OPTIONS.PORT_FORWARD,
    },
    {
      ...questions.portOptions,
      when: (answers) => answers.main === ROOT_OPTIONS.PORT_FORWARD && answers.portForward !== PORT_FORWARD_OPTIONS.EXIT,
    },
    {
      ...questions.customPort,
      when: (answers) => answers.portOptions === PORT_OPTIONS.CUSTOM,
    },
    {
      ...questions.editDeployment,
      when: (answers) => answers.main === ROOT_OPTIONS.EDIT_DEPLOYMENT,
    },
    {
      ...questions.activateCluster,
      when: (answers) => answers.main === ROOT_OPTIONS.KUBE_CONFIG,
    },
  ])
  .then((answers) => {
    switch (answers.main) {
      case ROOT_OPTIONS.PORT_FORWARD:
        executePortForward(answers);
        break;

      case ROOT_OPTIONS.EDIT_DEPLOYMENT:
        executeEditDeployment(answers);
        break;

      case ROOT_OPTIONS.KUBE_CONFIG:
        if (answers.activateCluster !== "Exit") {
          activateConfig(answers.activateCluster);
        }
        break;
      case ROOT_OPTIONS.LIST_ENVS:
        listEnvs();
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
