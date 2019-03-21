import { IStates } from '@apestaartje/state-machine/state/IStates';

import * as events from 'app/state/event';
import * as states from 'app/state/state';

const app: IStates = {
    initial: states.HOME,
    states: {
        [states.HOME]: {
            on: {
                [events.HELP]: states.INFO,
                [events.START]: states.GAME
            }
        },
        [states.INFO]: {
            on: {
                [events.HOME]: states.HOME,
                [events.START]: states.GAME
            }
        },
        [states.GAME]: {
            on: {
                [events.GAME_OVER]: states.SCORE,
                [events.RESTART]: states.GAME,
                [events.STOP]: states.HOME
            }
        },
        [states.SCORE]: {
            on: {
                [events.HOME]: states.HOME,
                [events.START]: states.GAME
            }
        }
    }
};

window.console.log('just a placeholder...');
