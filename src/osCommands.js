import process from "node:process";
import os from "node:os";

export function EolHandler(){
    console.log(JSON.stringify(os.EOL));
    console.log(`You are currently in ${process.cwd()}`);
}

export function CpusHandler(){
    console.log(`Total number of processors: ${os.cpus().length}`);
    let cpusInfo = [];
    os.cpus().forEach(el => {
        cpusInfo.push({Model: el.model, Speed: el.speed / 1000});
    });
    console.log(cpusInfo);
    console.log(`You are currently in ${process.cwd()}`);
}

export function HomedirHandler(userHomeDir){
    console.log(`User homedir is ${userHomeDir}`);
    console.log(`You are currently in ${process.cwd()}`);
}

export function UsernameHandler(){
    console.log(`User name is ${os.userInfo().username}`);
    console.log(`You are currently in ${process.cwd()}`);
}

export function ArchHandler(){
    console.log(`Processor architecture for which the Node.js binary is compiled is ${os.arch()}`);
    console.log(`You are currently in ${process.cwd()}`);
}