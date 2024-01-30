import { Player } from "../player";
import kick1 from "../../../assets/GameAsset/blast impulse/front kick/1.png"
import kick2 from "../../../assets/GameAsset/blast impulse/front kick/2.png"
import kick3 from "../../../assets/GameAsset/blast impulse/front kick/3.png"

import { State } from "../player-state";

export class FrontKick extends State{ 
    constructor(player : Player) {
        super(player, 
            [kick1, kick2, kick3],
            3, 
            true
        )
    }
} 
