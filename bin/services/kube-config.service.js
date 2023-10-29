import fs from "fs";
import os from "os";
import k8s from "@kubernetes/client-node";
import { Table } from "console-table-printer";
import chalk from "chalk";
import boxen from "boxen";

function getKubeDirectoryPath() {
  const userHomeDir = os.homedir();
  return `${userHomeDir}/.kube`;
}

function getServerUrl(filename) {
  try {
    const filepath = `${getKubeDirectoryPath()}/${filename}`;
    const data = fs.readFileSync(filepath, "utf8");
    const kc = new k8s.KubeConfig();
    kc.loadFromString(data);

    const servers = kc
      .getClusters()
      .filter((cluster) => {
        return cluster.server.includes("kubernetes.docker") ? false : true;
      })
      .map((cluster) => {
        const splitted = cluster.server.split(":")
        return `${splitted[0]}:${splitted[1]}`
      });

    return servers[0];
  } catch (error) {
    console.error("Couldn't find the file");
  }
}

function getActive() {
  try {
    const filepath = `${getKubeDirectoryPath()}/config`;
    const data = fs.readFileSync(filepath, "utf8");
    return data;
  } catch (error) {
    console.error("Couldn't find the file");
  }
}

function isActive(file) {
  try {
    const active = getActive();
    const filepath = `${getKubeDirectoryPath()}/${file}`;
    const data = fs.readFileSync(filepath, "utf8");
    return data == active;
  } catch (error) {
    console.error("Couldn't find the file");
  }
}

function getKubeConfigList() {
  const ignoreFiles = new Set(["cache", "config"]);
  try {
    const kubepath = getKubeDirectoryPath();
    const files = fs.readdirSync(kubepath);
    return files.filter((file) => !ignoreFiles.has(file));
  } catch (error) {
    console.error(error);
  }
}

function printTable(files) {
  const table = new Table({
    columns: [
      { name: "Name", alignment: "left" },
      { name: "Active", alignment: "left" },
      { name: "URL", alignment: "left" },
    ],
  });

  files.forEach((file) => table.addRow(file, { color: file.Active ? "yellow" : "white" }));
  table.printTable();
}

export function activateConfig(filename) {
  try {
    const kubepath = getKubeDirectoryPath();
    fs.copyFile(`${kubepath}/${filename}`, `${kubepath}/config`, (err) => {
      if (err) {
        throw err;
      }
      const server = getServerUrl(filename);
      console.log(`${filename} is active! you can open the link:`);
      const urlMessage = boxen(server, {
        title: "URL",
        titleAlignment: "center",
        padding: 0.5,
        borderColor: "green",
        dimBorder: true,
      });
      console.info(urlMessage);
    });
  } catch (error) {
    console.error(error);
  }
}

export function getKubeConfigListOptions() {
  try {
    const files = getKubeConfigList();

    return files.map((file) => {
      const active = isActive(file);

      return {
        name: active ? chalk.yellow(`${file} (Active)`) : file,
        value: file,
      };
    });
  } catch (error) {
    console.error(error);
  }
}

export function listEnvs() {
  try {
    const files = getKubeConfigList();
    const filesTable = [];
    files.forEach((file) => {
      const server = getServerUrl(file);
      const active = isActive(file);
      filesTable.push({
        Name: file,
        Active: active ? true : '',
        URL: server,
      });
    });

    printTable(filesTable);
  } catch (error) {
    console.error(error);
  }
}