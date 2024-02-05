import fs from "fs";
import crypto from "crypto";

export async function HashHandler(path){
    try{
        let rs = fs.createReadStream(path);
        var hash = crypto.createHash('sha256');
        hash.setEncoding('hex');
        rs.on('end', function() {
            hash.end();
            console.log(hash.read());
            rs.close();
        });
        rs.pipe(hash);
    } catch (err) {
        console.error(`Operation failed. ${err}`);
    }
    console.log(`You are currently in ${process.cwd()}`);
}