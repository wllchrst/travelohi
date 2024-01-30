import { Game } from "../game";
import { Component } from "../game-interface/component";
import { Mediator } from "../game-mediator";
import { Settings } from "../settings";

export class Timer extends Component {
    mediator : Mediator
    currentTime : number
    currentFrame : number
    constructor() {
        super(0,0, {
            x : 500, 
            y: 70 
        })

        this.currentTime = 0
        this.currentFrame = 0
        this.mediator = Mediator.getInstance()
    }

    render(): void {
        this.currentFrame++
        if(this.currentFrame == 60) {
            this.currentTime++
            this.currentFrame = 0
        }
        this.draw()
    }

    draw(): void {
        if(this.context) this.context.font = '30px Arial'
        this.context?.fillText('' + this.currentTime,
            this.position.x, this.position.y)
    }
}
