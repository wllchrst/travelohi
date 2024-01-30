import { Component } from "../game-interface/component";
import { Settings } from "../settings";
import { createImage } from "../util"
import backgroundImage from "../../assets/GameAsset/background/background.png"


export class Background extends Component{ 
    image : HTMLImageElement
    constructor() {
        super(
            1024, 768, {
                x: 0,
                y: 0
            }
        )
        this.image = createImage(backgroundImage)
    }
    render(): void {
        this.draw()
    } 

    draw(): void {
        this.context?.drawImage(
            this.image, 0, 0, this.width, this.height
        )
    }
}
