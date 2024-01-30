import { State } from "../player-state";
import jumping1 from "../../../assets/GameAsset/sword impulse/jumping/sword-impulse_jump_01.png"
import { SecondPlayer } from "../player";

export class JumpingStateInverse extends State { 

    constructor(player : SecondPlayer) {
        super(player, 
            [jumping1],
            1
        )
    }
} 
