import process from "node:process";
import readline from "readline";
import os from "node:os";
import { CdHandler, LsHandler } from "./src/nwd.js";
import { AddHandler, CatHandler, CpHandler, RmHandler, RnHandler, MvHandler } from "./src/filesOperations.js";
import { ArchHandler, CpusHandler, EolHandler, HomedirHandler, UsernameHandler } from "./src/osCommands.js";
import { HashHandler } from "./src/calcHash.js";
import { CompressHandler, DecompressHandler } from "./src/zip.js";

async function Start(){
    const userName = process.argv[2].slice(11);
    if(userName === undefined) throw new Error("Invalid username. Check that the entered username is correct and restart the program.");
    console.log(`Welcome to the File Manager, ${userName}!`);

    console.warn("ATTENTION.");
    console.warn("For correct operation of the program, please use paths to folders and files, as well as file names without spaces.");

    const userHomeDir = os.homedir();
    process.chdir(userHomeDir);
    console.log(`You are currently in ${userHomeDir}`);
    let currentDir = process.cwd();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on("SIGINT", () => {
        process.emit("SIGINT");
    });

    process.on("SIGINT", async () => {
        await Exit(userName, rl);
    });

    let command = "";
    rl.on("line", async (line) => {
        try{
            command = line.split(" ")[0];
            switch(command) {
                case ".exit":
                    await Exit(userName, rl);
                    break;
                case "up":
                    currentDir = await CdHandler("..");
                    break;
                case "cd":
                    currentDir = await CdHandler(line.slice(3));
                    break;
                case "ls":
                    await LsHandler(currentDir);
                    break;
                case "cat":
                    await CatHandler(line.slice(4));
                    break;
                case "add":
                    await AddHandler(line.slice(4));
                    break;
                case "rn":
                    await RnHandler(line.slice(3));
                    break;
                case "cp":
                    await CpHandler(line.slice(3));
                    break;
                case "mv":
                    MvHandler(line.slice(3))
                    break;
                case "rm":
                    await RmHandler(line.slice(3));
                    break;
                case "os":
                    switch(line.split(" ")[1]){
                        case "--EOL":
                            EolHandler();
                            break;
                        case "--cpus":
                            CpusHandler();
                            break;
                        case "--homedir":
                            HomedirHandler(userHomeDir);
                            break;
                        case "--username":
                            UsernameHandler();
                            break;
                        case "--architecture":
                            ArchHandler();
                            break;
                        default:
                            break;
                        }
                    break;
                case "hash":   
                    HashHandler(line.slice(5));
                    break;
                case "compress":
                    await CompressHandler(line.slice(9));
                    break;
                case "decompress":
                    await DecompressHandler(line.slice(11));
                    break;
                default:
                    console.log("Invalid input");
                    break;
                }
        } catch {
            console.error("Operation failed");
        }
    });
}

async function Exit(user, rl){
    console.log(`Thank you for using File Manager, ${user}, goodbye!`);
    process.exitCode = 0;
    rl.close();
}

await Start();