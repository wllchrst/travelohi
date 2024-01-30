import { State } from "../player-state";
import walking1 from "../../../assets/GameAsset/blast impulse/walking/1.png"
import walking2 from "../../../assets/GameAsset/blast impulse/walking/2.png"
import walking3 from "../../../assets/GameAsset/blast impulse/walking/3.png"
import { Player } from "../player";

export class WalkingState extends State { 

    constructor(player : Player) {
        super(player, 
            [walking1, walking2, walking3],
            3, false
        )
    }
} 
