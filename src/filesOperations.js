import process from "node:process";
import * as fsP from "fs/promises";
import { copyFile } from "node:fs/promises";
import fs from "fs";
import path from "node:path";

export async function CatHandler(line){
    try{
        const data = await fsP.readFile(line, {
            encoding: "utf8",
        });
        console.log(data);
        console.log(`You are currently in ${process.cwd()}`);
        // const stream = fs.createReadStream(path.join(line));
        // stream.on("data", (chunk) =>{
        //     process.stdout.write(chunk);
        //     console.log(`You are currently in ${process.cwd()}`);
        // }); 
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export async function AddHandler(line){
    try{
        await fsP.appendFile(path.join(line), "");
        console.log(`File ${path.join(line)} added.`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export async function RmHandler(line, pr = true){
    try{
        await fsP.rm(path.join(line));
        if (pr) console.log(`File ${path.join(line)} removed.`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export async function RnHandler(line){
    try{
        const splited = line.split(" ");
        const oldPath = path.join(splited[0]);
        console.log(splited[0]);
        let oldStat = path.parse(splited[0]);
        let newPath = path.join(oldStat.dir, splited[1] + oldStat.ext);
        await fsP.rename(oldPath, newPath);
        console.log(`File ${oldPath} renamed to ${newPath}.`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export async function CpHandler(line, pr = true){
    try{
        const splited = line.split(" ");
        const base = path.parse(splited[0]).base;
        await copyFile(path.join(splited[0]), path.join(splited[1], base));
        if (pr) console.log(`File ${path.join(splited[0])} copiedd in ${path.join(splited[1], base)}.`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    
}

export async function MvHandler(line){
    try {
        const splited = line.split(" ");
        await CpHandler(line, false);
        await RmHandler(splited[0], false);
        console.log(`File ${path.join(splited[0])} moved in ${path.join(splited[1])}.`);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
}