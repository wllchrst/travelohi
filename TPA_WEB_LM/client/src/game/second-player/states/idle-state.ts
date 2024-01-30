import { State } from "../player-state";
import idle1 from "../../../assets/GameAsset/sword impulse/idle/sword-impulse_01.png"
import idle2 from "../../../assets/GameAsset/sword impulse/idle/sword-impulse_02.png"
import idle3 from "../../../assets/GameAsset/sword impulse/idle/sword-impulse_03.png"
import idle4 from "../../../assets/GameAsset/sword impulse/idle/sword-impulse_04.png"
import idle5 from "../../../assets/GameAsset/sword impulse/idle/sword-impulse_05.png"
import idle6 from "../../../assets/GameAsset/sword impulse/idle/sword-impulse_06.png"

import { SecondPlayer } from "../player";

export class IdleState extends State {
    constructor(player : SecondPlayer) {
        super(
            player,
            [idle1, idle2, idle3, idle4, idle5, idle6],
            6, false
        )
    }
}
