import { State } from "../player-state";
import jumping1 from "../../../assets/GameAsset/blast impulse/jump/1.png"
import { Player } from "../player";

export class JumpingState extends State { 

    constructor(player : Player) {
        super(player, 
            [jumping1],
            1
        )
    }
} 
