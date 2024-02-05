import process from "node:process";
import os from "node:os";

export function EolHandler(){
    try{
        console.log(JSON.stringify(os.EOL));
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export function CpusHandler(){
    try{
        console.log(`Total number of processors: ${os.cpus().length}`);
        let cpusInfo = [];
        os.cpus().forEach(el => {
            cpusInfo.push({Model: el.model, Speed: el.speed / 1000});
        });
        console.log(cpusInfo);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export function HomedirHandler(userHomeDir){
    try{
        console.log(`User homedir is ${userHomeDir}`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export function UsernameHandler(){
    try{
        console.log(`User name is ${os.userInfo().username}`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export function ArchHandler(){
    try{
        console.log(`Processor architecture for which the Node.js binary is compiled is ${os.arch()}`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}