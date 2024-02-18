import { IUser } from "../interfaces/user-interface";
import { Game } from "./game";
import { Server } from "./server";

export default function startGame(canvas : HTMLCanvasElement, id : number, user : IUser){
    Server.getInstance().playerID = id
    const game = Game.getInstance(canvas, user)
    game.start()
}

