import { SecondPlayer } from "../player";
import { State } from "../player-state";
import kick1 from "../../../assets/GameAsset/sword impulse/low kick mirrored/sword-impulse_01.png"
import kick2 from "../../../assets/GameAsset/sword impulse/low kick mirrored/sword-impulse_02.png"
import kick3 from "../../../assets/GameAsset/sword impulse/low kick mirrored/sword-impulse_03.png"

export class LowKickInverse extends State { 
    constructor(player : SecondPlayer) {
        super(player, 
            [kick1, kick2, kick3],
            3, 
            true
        )
    }
} 
