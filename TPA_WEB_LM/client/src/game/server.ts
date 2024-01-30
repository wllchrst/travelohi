import { Socket, io } from "socket.io-client"

export class Server {
    private static instance : Server
    socket : Socket
    playerID : number
    constructor() {  
        console.log('CONNECTIN TO SOCKET');
        this.socket = io("http://localhost:3001")
        this.playerID = -1
    }

    static getInstance(){ 
        if(this.instance == null) {
            this.instance = new Server()
        }
        return this.instance
    }
}
