import { IPlayerUpdate } from "./game-interface/player-updates-interface";
import { Mediator } from "./game-mediator";
import { Player } from "./player/player";
import { SecondPlayer } from "./second-player/player";
import { Server } from "./server";
import { Settings } from "./settings";
import { Background } from "./ui/background";
import { HealthBar } from "./ui/health-bar";
import { Timer } from "./ui/timer";
import winImage from "../assets/GameAsset/win.png"
import loseImage from "../assets/GameAsset/lose.png"
import drawImage from "../assets/GameAsset/draw.png"
import { createImage } from "./util";


export class Game { 
    // FPS Variables
    now : number = 0
    then : number = 0
    elapsed : number = 0
    fps : number = 0
    startTime : number = 0
    fpsInterval : number = 0

    gameRunning : boolean


    canvas : HTMLCanvasElement
    context : CanvasRenderingContext2D | null
    targetFPS : number

    player : Player | null = null

    firstPlayerHealthBar : HealthBar | null = null
    secondHealthBar : HealthBar | null = null

    timer : Timer | null = null

    secondPlayer : SecondPlayer | null = null

    private static instance : Game | null
    background : Background | null = null

    constructor (canvas : HTMLCanvasElement){
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.targetFPS = Settings.FPS
        this.gameRunning = true

        // rendering init
        this.fps = 30
        this.fpsInterval = 1000 / this.fps
        this.then = Date.now()
        this.startTime = this.then 
    }

    static getInstance (canvas : HTMLCanvasElement | null) {
        if(!Game.instance && canvas) {
            Game.instance = new Game(canvas)
        }
        return Game.instance
    }

    stopGame (){
        this.gameRunning = false
    }

    losePage(){
        const image = createImage(loseImage)
        this.context?.drawImage(image, 275, 200, 500, 250)
    }

    winPage(){
        const image = createImage(winImage)
        this.context?.drawImage(image, 275, 200, 500, 250)
    }

    tiePage() {
        const image = createImage(drawImage)
        this.context?.drawImage(image, 275, 200, 500, 250)
    }

    checkSomeoneDied() {
        if(!this.player) return 
        else if(!this.secondPlayer) return
        else if(!this.timer) return
        const playerID = Server.getInstance().playerID
        if(this.player.health <= 0) {
            this.stopGame()
            if(playerID == 0 || playerID == 100) this.losePage()
            else this.winPage()
        }
        else if(this.secondPlayer.health <= 0) {
            this.stopGame()
            if(playerID == 1 || playerID == 100) this.losePage()
            else this.winPage()
        }
        else if(this.timer?.currentTime >= 60) {
            this.tiePage()

        }
    }

    render(){
        if(this.gameRunning == false) return;
        requestAnimationFrame(this.render.bind(this))

        this.now = Date.now()
        this.elapsed = this.now - this.then
        
        if(this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed - this.fpsInterval)
            this.updateHealthBar()
            this.context?.clearRect(0, 0, 1024, 768)
            this.background?.render()
            this.secondHealthBar?.render()
            this.firstPlayerHealthBar?.render()
            this.timer?.render()
            this.player?.render()
            this.secondPlayer?.render()
            this.checkSomeoneDied()
            console.log('WHY IS IT STILL RUNNING');
            console.log(Server.getInstance().playerID);
        }
    }

    updateChanges(data : IPlayerUpdate){
        if(data.playerNumber == 1 || data.playerNumber == 100) {
            this.player?.UpdatePlayer(data)
        }
        else {
            this.secondPlayer?.UpdatePlayer(data)
        }
    }

    updateHealthBar (){ 
        if(this.secondHealthBar && this.secondPlayer) {
            this.secondHealthBar.healthPercentage = this.secondPlayer.health / Settings.HEALTH
        }
        if(this.firstPlayerHealthBar && this.player) {
            this.firstPlayerHealthBar.healthPercentage = this.player.health / Settings.HEALTH
        }
    }

    init() {
        this.player = new Player()
        this.secondPlayer = new SecondPlayer()
        this.background = new Background()
        this.secondHealthBar= new HealthBar(true)
        this.firstPlayerHealthBar = new HealthBar(false)
        this.timer = new Timer()
        Mediator.getInstance()
        Server.getInstance().socket.on("player_change", (data) => {
            this.updateChanges(data)
        })
    }
    
    static stop(){
        if(this.instance) {
            this.instance.gameRunning = false
            Server.getInstance().socket.disconnect()
            this.instance = null
        }
    }


    start(){
        this.init()
        this.render()
    }
}
