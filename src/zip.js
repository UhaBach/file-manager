import zlib from "node:zlib";
import fs from "fs";
import path from "node:path";

export async function CompressHandler(line){
    try{
        const splited = line.split(" ");
        const rs = fs.createReadStream(path.join(splited[0]));
        const ws = fs.createWriteStream(path.join(splited[1]));

        const comp = zlib.createBrotliCompress();

        rs.pipe(comp).pipe(ws);
        
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    console.log(`File compressed.`);
    console.log(`You are currently in ${process.cwd()}`);
}

export async function DecompressHandler(line){
    try{
        const splited = line.split(" ");
        const rs = fs.createReadStream(path.join(splited[0]));
        const ws = fs.createWriteStream(path.join(splited[1]));

        const comp = zlib.createBrotliDecompress();

        rs.pipe(comp).pipe(ws);
        
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    console.log(`File decompressed.`);
    console.log(`You are currently in ${process.cwd()}`);
}