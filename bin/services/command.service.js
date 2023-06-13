import { spawn } from "child_process";

export function run(command, options = []) {
  console.info(`executing command: ${command} ${options.join(" ")}`);

  const child = spawn(command, options)

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  }); 
}