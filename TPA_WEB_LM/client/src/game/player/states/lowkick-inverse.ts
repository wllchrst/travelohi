import { Player } from "../player";
import { State } from "../player-state";
import kick1 from "../../../assets/GameAsset/blast impulse/low kick mirrored/1.png"
import kick2 from "../../../assets/GameAsset/blast impulse/low kick mirrored/2.png"
import kick3 from "../../../assets/GameAsset/blast impulse/low kick mirrored/3.png"
import kick4 from "../../../assets/GameAsset/blast impulse/low kick mirrored/4.png"


export class LowKickInverse extends State { 

    constructor(player : Player) {
        super(player, 
            [kick1, kick2, kick3, kick4],
            4, 
            true
        )
    }
} 
