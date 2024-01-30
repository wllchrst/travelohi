import { State } from "../player-state";
import walking1 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_1.png"
import walking2 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_2.png"
import walking3 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_3.png"
import walking4 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_4.png"
import walking5 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_5.png"
import walking6 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_6.png"
import walking7 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_7.png"
import walking8 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_8.png"
import walking9 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_9.png"
import walking10 from "../../../assets/GameAsset/sword impulse/walking/sword-impulse_10.png"
import { SecondPlayer } from "../player";

export class WalkingState extends State { 

    constructor(player : SecondPlayer) {
        super(player, 
            [walking1, walking2, walking3, walking4, walking5, walking6, walking7, walking8, walking9, walking10],
            10, false
        )
    }
} 
