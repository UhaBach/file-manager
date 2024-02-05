import process from "node:process";
import * as fsP from "fs/promises";
import { copyFile } from "node:fs/promises";
import fs from "fs";
import path from "node:path";

export async function CatHandler(line){
    const stream = fs.createReadStream(path.join(line));
    stream.on("data", (chunk) =>{
        process.stdout.write(chunk);
        console.log(`You are currently in ${process.cwd()}`);
        stream.close();
    }); 
}

export async function AddHandler(line){
    await fsP.appendFile(path.join(line), "");
    console.log(`You are currently in ${process.cwd()}`);
}

export async function RmHandler(line){
    await fsP.rm(path.join(line));
    console.log(`You are currently in ${process.cwd()}`);
}

export async function RnHandler(line){
    const splited = line.split(" ");
    const oldPath = path.join(splited[0]);
    console.log(splited[0]);
    let oldStat = path.parse(splited[0]);
    let newPath = path.join(oldStat.dir, splited[1] + oldStat.ext);
    await fsP.rename(oldPath, newPath);
}

export async function CpHandler(line){
    const splited = line.split(" ");
    const base = path.parse(splited[0]).base;
    await copyFile(path.join(splited[0]), path.join(splited[1], base));
}

export async function MvHandler(line){
    try {
        const splited = line.split(" ");
        await CpHandler(line);
        await RmHandler(splited[0]);
        console.log(`mv is successfully moved.`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
}