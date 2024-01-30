import { KeyEventType } from "../enums/key-events";
import { IPlayerUpdate } from "../game/game-interface/player-updates-interface";
import { IPosition } from "../game/game-interface/position-interface";

export default class GameUtil{
    static createKeyEvent(type : string, key : string, code : string) {
        if(!(type == KeyEventType.KEYDOWN || type == KeyEventType.KEYUP)) return null;

        const keyEvent = new KeyboardEvent(type, {
            key: key,
            code: code
        })

        return keyEvent
    }

    static createPlayerInformation(playerNumber : number, action : string,position : IPosition){ 
        const playerInformation : IPlayerUpdate = {
            playerNumber: playerNumber,
            action: action,
            position: position,
        }

        return playerInformation
    }
}
