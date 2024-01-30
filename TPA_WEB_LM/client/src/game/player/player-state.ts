import { createImage } from "../util"
import { Player } from "./player"
import { IdleState } from "./states/idle-state"

export class State {
    images: HTMLImageElement[] = []
    numberOfFrame : number
    currentFrame : number = 0
    player : Player
    once : boolean
    constructor(player : Player, imagePaths: string[], frameCount : number, once : boolean) {
        this.once = once
        this.player = player
        this.numberOfFrame = frameCount
        imagePaths.forEach((imagePath) => {
            const image = createImage(imagePath)
            this.images.push(image)
        })
    }

    draw() {
        if(this.currentFrame >= this.numberOfFrame) {
            this.currentFrame = 0
            if(this.once) {
                this.player.kickLow = false
                this.player.isFrontKick= false
                this.player.isFrontKickInverse= false
            }
        }
        // this.player.context?.fillRect(this.player.position.x, this.player.position.y,
        //     this.player.width, this.player.height)
        this.player.context?.drawImage(
            this.images[this.currentFrame], this.player.position.x, this.player.position.y ,
            this.player.width, this.player.height
        )
        this.currentFrame = this.currentFrame + 1
    }
}
