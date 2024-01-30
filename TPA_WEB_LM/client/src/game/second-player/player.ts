import GameUtil from "../../utils/keyevent";
import { Action } from "../game-interface/action_enum";
import { Component } from "../game-interface/component"
import { IPlayerUpdate } from "../game-interface/player-updates-interface";
import { IKeyPressed } from "../game-interface/press-interface";
import { IVelocity } from "../game-interface/velocity-interface";
import { Mediator } from "../game-mediator";
import { Server } from "../server";
import { Settings } from "../settings";
import { State } from "./player-state";
import { FrontKick } from "./states/frontkick";
import { FrontKickInverse } from "./states/frontkick-inverse";
import { IdleState } from "./states/idle-state";
import { IdleStateInverse } from "./states/idle-state-inverse";
import { JumpingState } from "./states/jumping-state";
import { JumpingStateInverse } from "./states/jumping-state-inverse";
import { LowKick } from "./states/lowkick";
import { LowKickInverse } from "./states/lowkick-inverse";
import { WalkingState } from "./states/walking-state";
import { WalkingStateInverse } from "./states/walking-state-inverse";

export class SecondPlayer extends Component{
    velocity : IVelocity
    gravity : number
    movingRight : boolean
    movingLeft : boolean
    kickLow : boolean
    isFrontKick : boolean
    isFrontKickInverse : boolean
    isJumping : boolean
    jumpCooldown : number
    canJump : boolean
    state : State
    server : Server
    health : number
    keyPressed: { [key: string]: boolean } = {};
    mediator : Mediator
    gameIsRunning : boolean

    constructor() { 
        super(Settings.PLAYER_WIDTH, Settings.PLAYER_HEIGHT, {
            x: 1024 - 300,
            y : 100
        })

        this.isJumping = false
        this.canJump = true
        this.jumpCooldown = 0

        this.movingLeft = false
        this.movingRight = false

        this.kickLow = false
        this.isFrontKick = false
        this.isFrontKickInverse = false

        this.gameIsRunning = true 

        this.server = Server.getInstance()

        this.gravity = Settings.GRAVITY
        this.velocity = {
            x : 0,
            y : 0
        }

        this.health = Settings.HEALTH

        this.state = new IdleState(this)

        if(this.server.playerID == 2 || this.server.playerID == 100) {
            addEventListener('keydown', (event) => {
                if(this.gameIsRunning == false) return
                this.handleKeyDown(event);
                const key = event.key
                if((key == 'w' || key == 'W')) { 
                    this.emitInformation(Action.JUMP)
                    this.jump()
                }
                else if(key == 'a' || key == 'A') {
                    this.emitInformation(Action.MOVING_LEFT)
                    this.moveLeft()
                }
                else if(key == 'd' || key == 'D') {
                    this.emitInformation(Action.MOVING_RIGHT)
                    this.moveRight()
                }
                else if(this.keyPressed['s'] && this.keyPressed[' ']) {
                    this.emitInformation(Action.LOW_KICK)
                    this.lowKick()
                }
                else if(this.keyPressed['d'] && this.keyPressed[' ']) {
                    this.emitInformation(Action.FRONT_KICK)
                    this.frontKick()
                }
                else if(this.keyPressed['a'] && this.keyPressed[' ']) {
                    this.emitInformation(Action.FRONT_KICK_INVERSER)
                    this.frontKickInverse()
                }
            })
    
            addEventListener('keyup', (event) => {
                if(this.gameIsRunning == false) return
                this.handleKeyUp(event)
                const key = event.key
                if(key == 'a' || key == 'A') {
                    this.emitInformation(Action.STOP_LEFT)
                    this.stopLeft()
                }
                else if(key == 'd' || key == 'D') {
                    this.emitInformation(Action.STOP_RIGHT)
                    this.stopRight()
                }
            })
        }
        this.mediator = Mediator.getInstance()
    }

    
    handleKeyUp(event : KeyboardEvent){
        this.keyPressed[event.key] = false
    }

    handleKeyDown(event : KeyboardEvent){
        this.keyPressed[event.key] = true
    }

    // ! ____________________________MOVE

    jump(){
        if(this.canJump) {
            this.velocity.y -= Settings.JUMP_FORCE
            this.jumpCooldown = Settings.JUMP_COOLDOWN
        }
    }

    moveLeft(){ 
        this.movingLeft = true
        this.movingRight = false
    }

    stopLeft(){
        this.movingLeft = false
    }

    moveRight(){
        this.movingLeft = false 
        this.movingRight = true
    }

    stopRight (){
        this.movingRight = false
    }

    lowKick(){
        this.mediator.secondPlayerLowKick()
        this.kickLow = true
    }

    frontKick(){
        this.mediator.secondPlayerFrontKick(Action.RIGHT_FRONT_KICK)
        this.isFrontKick = true
    }

    frontKickInverse(){
        this.mediator.secondPlayerFrontKick(Action.LEFT_FRONT_KICK)
        this.isFrontKickInverse = true
    }

    // ! ______________________________ ____

    UpdatePlayer(playerInformation : IPlayerUpdate){
        const action = playerInformation.action
        if(action == Action.JUMP) {
            this.jump();
        }
        else if(action == Action.MOVING_LEFT) {
            this.moveLeft()
        }
        else if(action == Action.MOVING_RIGHT) {
            this.moveRight()
        }
        else if(action == Action.STOP_LEFT) {
            this.stopLeft()
        }
        else if(action == Action.STOP_RIGHT) {
            this.stopRight()
        }
        else if(action == Action.LOW_KICK) {
            this.lowKick()
        }
        else if(action == Action.FRONT_KICK) {
            this.frontKick()
        }
        else if(action == Action.FRONT_KICK_INVERSER) {
            this.frontKickInverse()
        }
    }

    yAxisLogic (){
        if(this.position.y + this.height + this.velocity.y >= this.canvas.height - Settings.GROUND_HEIGHT) {
            this.velocity.y = 0
            this.isJumping = false
        }
        else {
            this.isJumping = true
            this.velocity.y += this.gravity
        }
    }

    xAxisLogic (){
        if(this.movingRight) {
            this.position.x += Settings.RIGHT_LEFT_SPEED
        }
        else if(this.movingLeft) { 
            this.position.x -= Settings.RIGHT_LEFT_SPEED
        }
        else {
            this.velocity.x = 0
        }
    }

    movement(){
        if(this.jumpCooldown <= 0) {
            this.canJump = true
        }
        else {
            this.canJump = false
            this.jumpCooldown--
        }
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.yAxisLogic()
        this.xAxisLogic()
    }

    configureState(){
        if(this.movingRight) {
            const orientation = this.mediator.secondPlayerOrientation()
            if(orientation == Action.INVERSE) {
                if(!(this.state instanceof WalkingStateInverse)) this.state = new WalkingStateInverse(this)
                return
            }
            if(!(this.state instanceof WalkingState)) this.state = new WalkingState(this)
        }
        else if(this.movingLeft) {
            const orientation = this.mediator.secondPlayerOrientation()
            if(orientation == Action.NORMAL) {
                if(!(this.state instanceof WalkingState)) this.state = new WalkingState(this)
                return
            }
            if(!(this.state instanceof WalkingStateInverse)) this.state = new WalkingStateInverse(this)
        }
        else if(this.isJumping) {
            if(!(this.state instanceof JumpingState)) this.state = new JumpingState(this)
        }
        else if(this.kickLow) {
            const orientation = this.mediator.secondPlayerOrientation()
            if(orientation == Action.INVERSE) {
                if(!(this.state instanceof LowKickInverse)) this.state = new LowKickInverse(this)
                return
            }
            if(!(this.state instanceof LowKick)) this.state = new LowKick(this)
        }
        else if(this.isFrontKick) {
            if(!(this.state instanceof FrontKick)) this.state = new FrontKick(this)
        }
        else if(this.isFrontKickInverse) {
            if(!(this.state instanceof FrontKickInverse)) this.state = new FrontKickInverse(this)
        }
        else {
            const orientation = this.mediator.secondPlayerOrientation()
            if(orientation == Action.INVERSE) {
                if(!(this.state instanceof IdleStateInverse)) this.state = new IdleStateInverse(this)
            }
            else if(orientation == Action.NORMAL){
                if(!(this.state instanceof IdleState)) this.state = new IdleState(this)
            }
        }
    }

    emitInformation(action : string) {
        const playerInformation : IPlayerUpdate = GameUtil.createPlayerInformation(
            Server.getInstance().playerID,
            action, 
            this.position)
        Server.getInstance().socket.emit("player_change", playerInformation)
    }

    render(){
        this.gameIsRunning = this.mediator.getGameIsRunning()
        this.configureState()
        this.draw()
        this.movement()
    }

    draw() {
        this.state.draw()
    }
}
