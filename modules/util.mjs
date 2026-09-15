import { loadEnvFile } from "node:process";

export class ServerData {
    constructor(port) {
        this.port = port; 
    }
} 

export function setup() {
    // load environment variables from .env file
    loadEnvFile();

    let port = process.env.PORT != null ? process.env.PORT : 3000; 

    return new ServerData(port); 
}