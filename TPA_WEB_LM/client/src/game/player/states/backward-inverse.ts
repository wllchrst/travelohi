
import { Player } from "../player";
import back1 from "../../../assets/GameAsset/blast impulse/backward mirrored/1.png"
import back2 from "../../../assets/GameAsset/blast impulse/backward mirrored/2.png"
import back3 from "../../../assets/GameAsset/blast impulse/backward mirrored/3.png"
import { State } from "../player-state";

export class BackwardInverse extends State{ 

    constructor(player : Player) {
        super(player, 
            [back1, back2, back3],
            3, 
            false
        )
    }
} 
