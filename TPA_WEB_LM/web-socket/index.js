const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors)

let connectedSocketsCount = 0;
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    if(connectedSocketsCount >= 2) {
        socket.disconnect(true)
    }
    connectedSocketsCount++;
    console.log(`CONNECT | Connected Socket Count : ${connectedSocketsCount}`);

    if(connectedSocketsCount == 2) {
        console.log('STARTING GAME');
        io.emit("start_game")
    }

    socket.emit("give_player_number", {
        playerID : connectedSocketsCount
    })
    

    console.log(connectedSocketsCount);

    socket.on("player_change", (data) => {
        socket.broadcast.emit("player_change", data)
    })

    socket.on("disconnect", socket => {
        connectedSocketsCount--
        console.log(`DISCONECT | Connected Socket Count : ${connectedSocketsCount}`);
    })
})


server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
})
