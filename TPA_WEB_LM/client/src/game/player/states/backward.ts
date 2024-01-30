
import { Player } from "../player";
import back1 from "../../../assets/GameAsset/blast impulse/backward/1.png"
import back2 from "../../../assets/GameAsset/blast impulse/backward/2.png"
import back3 from "../../../assets/GameAsset/blast impulse/backward/3.png"
import { State } from "../player-state";

export class Backward extends State{ 

    constructor(player : Player) {
        super(player, 
            [back1, back2, back3],
            3, 
            false
        )
    }
} 
