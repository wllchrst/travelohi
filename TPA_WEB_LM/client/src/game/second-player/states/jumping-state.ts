import { State } from "../player-state";
import jumping1 from "../../../assets/GameAsset/sword impulse/jumping/sword-impulse_jump_01.png"
import jumping2 from "../../../assets/GameAsset/sword impulse/jumping/sword-impulse_jump_02.png"
import jumping3 from "../../../assets/GameAsset/sword impulse/jumping/sword-impulse_jump_03.png"
import jumping4 from "../../../assets/GameAsset/sword impulse/jumping/sword-impulse_jump_04.png"
import jumping5 from "../../../assets/GameAsset/sword impulse/jumping/sword-impulse_jump_05.png"
import { SecondPlayer } from "../player";

export class JumpingState extends State { 

    constructor(player : SecondPlayer) {
        super(player, 
            [jumping1, jumping2, jumping3, jumping4, jumping5],
            1
        )
    }
} 
