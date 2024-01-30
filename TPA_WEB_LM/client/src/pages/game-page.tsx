import { useEffect, useRef, useState } from "react";
import "../game/main"
import "../styles/game.scss"
import startGame from "../game/main";
import { Server } from "../game/server";
import { Game } from "../game/game";
import Button from "../components/wrapper/button";
import { Title } from "../components/wrapper/title";


export default function GamePage () {
    const canvas = useRef<HTMLCanvasElement>(null)
    const [ID, setID] = useState(-1)
    const [isStartGame, setIsStartGame] = useState(false)

    useEffect(() => {
        Server.getInstance().socket.on("give_player_number", data => {
            setID(data.playerID)
        })
        Server.getInstance().socket.on("start_game", data => {
            console.log('STARTING GAME');
            setIsStartGame(true)
        })
    }, [])
    
    useEffect(() => {
        if(canvas.current && ID >= 0 && isStartGame == true) {
            console.log(ID);
            startGame(canvas.current, ID)
        }

        return () => {
            console.log('STOPPING GAME');
            Game.stop()
        };
    }, [canvas, ID, isStartGame]);

    return (
        <div className="canvas-container">
            {isStartGame ? 
                <div className="center flex-col gap-2">
                    <Title>You Are Player {ID}</Title>
                    <canvas id="canvas" width={1024} height={768} ref={canvas}></canvas>
                </div>
            : <>
                <Title>Waiting For Another Player To Join</Title>
            </>}
        </div>
    )
}
