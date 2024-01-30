import { State } from "../player-state";
import idle1 from "../../../assets/GameAsset/blast impulse/idle mirrored/idle 1.png"
import idle2 from "../../../assets/GameAsset/blast impulse/idle mirrored/idle 2.png"
import idle3 from "../../../assets/GameAsset/blast impulse/idle mirrored/idle 3.png"
import idle4 from "../../../assets/GameAsset/blast impulse/idle mirrored/idle 4.png"
import idle5 from "../../../assets/GameAsset/blast impulse/idle mirrored/idle 5.png"
import idle6 from "../../../assets/GameAsset/blast impulse/idle mirrored/idle 6.png"
import { Player } from "../player";

export class IdleStateInverse extends State {
    constructor(player : Player) {
        super(
            player,
            [idle1, idle2, idle3, idle4, idle5, idle6],
            6, false
        )
    }
}
