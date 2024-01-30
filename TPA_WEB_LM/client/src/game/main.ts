import { Game } from "./game";
import { Server } from "./server";

export default function startGame(canvas : HTMLCanvasElement, id : number){
    Server.getInstance().playerID = id
    const game = Game.getInstance(canvas)
    game.start()
}

