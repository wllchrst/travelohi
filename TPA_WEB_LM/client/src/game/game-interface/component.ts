import { Game } from "../game"
import { IPosition } from "./position-interface"

export class Component {
    width : number
    height : number
    position : IPosition
    canvas : HTMLCanvasElement
    context : CanvasRenderingContext2D | null

    constructor(width : number, height : number, position : IPosition) {
        this.width = width
        this.height = height
        this.position = position
        this.canvas = Game.getInstance(null).canvas
        this.context = this.canvas.getContext("2d")
    }
    render() {
        // what the this component does every time the animation rendered
    }

    draw() {
        // drawing the component in to the canvas
    }
}
