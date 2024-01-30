import { Game } from "./game";
import { Action } from "./game-interface/action_enum";
import { Player } from "./player/player";
import { SecondPlayer } from "./second-player/player";
import { Settings } from "./settings";

export class Mediator {
    game : Game
    firstPlayer : Player | null
    secondPlayer : SecondPlayer | null
    private static instance : Mediator | null = null

    constructor (){
        this.game = Game.getInstance(null)
        this.firstPlayer = this.game.player
        this.secondPlayer = this.game.secondPlayer
    }

    static getInstance (){
        if(this.instance == null) {
            this.instance = new Mediator()
        }
        return this.instance
    }

    firstPlayerOrientation(){ 
        this.firstPlayer = this.game.player
        this.secondPlayer = this.game.secondPlayer
        if(this.firstPlayer && this.secondPlayer)
            if(this.firstPlayer?.position.x <= this.secondPlayer?.position.x) {
                return Action.NORMAL
            }
            return Action.INVERSE
    }

    secondPlayerOrientation (){
        this.firstPlayer = this.game.player
        this.secondPlayer = this.game.secondPlayer
        if(this.firstPlayer && this.secondPlayer)
            if(this.secondPlayer.position.x >= this.firstPlayer.position.x) {
                return Action.INVERSE
            }
            return Action.NORMAL
    }

    firstPlayerIsLeft() {
        const normal = this.firstPlayerOrientation()
        if(normal == Action.NORMAL) return true
        return false
    }

    checkColliding(player : string){
        this.firstPlayer = this.game.player
        this.secondPlayer = this.game.secondPlayer

        const isLeft = this.firstPlayerIsLeft()

        if(!(this.firstPlayer && this.secondPlayer)) return
        // colliding left -> buat first player
        if(this.firstPlayer?.position.x + Settings.PLAYER_WIDTH >= this.secondPlayer?.position.x && isLeft) {
            return (player == Action.FIRST_PLAYER ? Action.COLLIDING_LEFT : Action.COLLIDING_RIGHT)
        }
        // colliding right
        else if(this.secondPlayer.position.x + Settings.PLAYER_WIDTH >= this.firstPlayer.position.x && !isLeft) {
            return (player == Action.FIRST_PLAYER ? Action.COLLIDING_RIGHT : Action.COLLIDING_LEFT)
        }
        return Action.NOT_COLLIDING
    }

    firstPlayerLowKick (){
        if(this.secondPlayer)  {
            const colliding = this.checkColliding(Action.FIRST_PLAYER)
            if(colliding == Action.NOT_COLLIDING) return 
            this.secondPlayer.health -= Settings.LOWKICK_DAMAGE
        }
    }

    secondPlayerLowKick(){
        if(this.firstPlayer)  {
            const colliding = this.checkColliding(Action.SECOND_PLAYER)
            if(colliding == Action.NOT_COLLIDING) return 
            this.firstPlayer.health -= Settings.LOWKICK_DAMAGE
        }
    }

    firstPlayerFrontKick(kickType : string) {
        if(this.secondPlayer) {
            const colliding = this.checkColliding(Action.FIRST_PLAYER)
            if(colliding == Action.NOT_COLLIDING) return
            else if(kickType == Action.RIGHT_FRONT_KICK && colliding == Action.COLLIDING_LEFT) {
                this.secondPlayer.health -= Settings.LOWKICK_DAMAGE
            }
            else if(kickType == Action.LEFT_FRONT_KICK && colliding == Action.COLLIDING_RIGHT) {
                this.secondPlayer.health -= Settings.LOWKICK_DAMAGE
            }
        }
    }

    secondPlayerFrontKick(kickType : string) {
        if(this.firstPlayer) {
            const colliding = this.checkColliding(Action.SECOND_PLAYER)
            if(colliding == Action.NOT_COLLIDING) return
            else if(kickType == Action.RIGHT_FRONT_KICK && colliding == Action.COLLIDING_LEFT) {
                this.firstPlayer.health -= Settings.LOWKICK_DAMAGE
                console.log(this.firstPlayer.health);
            }
            else if(kickType == Action.LEFT_FRONT_KICK && colliding == Action.COLLIDING_RIGHT) {
                this.firstPlayer.health -= Settings.LOWKICK_DAMAGE
            }
        } 
    }

    getGameIsRunning(){ 
        return this.game.gameRunning
    }

    gameTie (){
        
    }
}
