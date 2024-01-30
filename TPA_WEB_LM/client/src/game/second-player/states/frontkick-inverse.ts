import { SecondPlayer } from "../player";
import kick1 from "../../../assets/GameAsset/sword impulse/front kick mirrored/sword-impulse_01.png"
import kick2 from "../../../assets/GameAsset/sword impulse/front kick mirrored/sword-impulse_02.png"
import kick3 from "../../../assets/GameAsset/sword impulse/front kick mirrored/sword-impulse_03.png"
import kick4 from "../../../assets/GameAsset/sword impulse/front kick mirrored/sword-impulse_04.png"
import { State } from "../player-state";

export class FrontKickInverse extends State{ 

    constructor(player : SecondPlayer) {
        super(player, 
            [kick1, kick2, kick3, kick4],
            4, 
            true
        )
    }
} 
