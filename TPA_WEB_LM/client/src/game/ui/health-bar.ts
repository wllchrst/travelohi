import { Component } from "../game-interface/component";
import { createImage } from "../util";
import healthBarImage from "../../assets/GameAsset/lifebar.png"
import { Settings } from "../settings";

export class HealthBar extends Component {
    barImage : HTMLImageElement
    reverse : boolean
    healthPercentage : number
    // barRectanglk

    constructor(reverse : boolean) {
        super(0, 0, {
            x: 0, y: 0
        });

        this.reverse = reverse

        this.barImage = createImage(healthBarImage)
        this.healthPercentage = 1
    }

    render(): void {
        this.draw()
    }

    draw(): void {
        if(this.context?.fillStyle) {
            this.context.fillStyle = 'red'
        }
        if(this.reverse) {
            this.context?.save()
            this.context?.translate(this.canvas.width, 0)
            this.context?.scale(-1, 1)
            this.context?.fillRect(25, 40, 
                Settings.HEALTH_WIDTH * this.healthPercentage, Settings.HEALTH_HEIGHT)
            this.context?.drawImage(this.barImage, 
                0, 0,
                Settings.BAR_WIDTH, Settings.BAR_HEIGHT)
            this.context?.restore()

            return
        }
        this.context?.fillRect(25, 40, 
                Settings.HEALTH_WIDTH * this.healthPercentage, Settings.HEALTH_HEIGHT)
        this.context?.drawImage(this.barImage, 
                0, 0,
                Settings.BAR_WIDTH, Settings.BAR_HEIGHT)
    }
}
