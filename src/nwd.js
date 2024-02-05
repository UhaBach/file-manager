import process from "node:process";
import * as fsP from "fs/promises";
import path from "node:path";

export async function CdHandler(path){
    try{
        process.chdir(path);
        console.log(`You are currently in ${process.cwd()}`);
        return process.cwd();
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
}

export async function LsHandler(currentDir){
    try{
        let files = await fsP.readdir(currentDir);
        let stats = await Promise.all(
            files.map(file => path.parse(file))
        );
        stats.sort((a, b) => a.name > b.name ? 1 : -1);
        stats.sort((a, b) => {
            if (a.ext === "" & b.ext !== "") return -1;
            if (a.ext !== "" & b.ext === "") return 1;
            else return 0;
        });
        const table = [];
        stats.forEach((el, ind) => {
            table.push({ Name: el.base, Type: el.ext === "" ? "directory" : "file"});
        });
        console.table(table);
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
}