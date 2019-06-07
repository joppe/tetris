import { machine, state } from '@apestaartje/state-machine';

import * as events from 'app/state/event';
import * as states from 'app/state/state';

const stateConfig: state.States = {
    initial: states.HOME,
    states: {
        [states.HOME]: {
            on: {
                [events.HELP]: states.INFO,
                [events.START]: states.GAME,
            },
        },
        [states.INFO]: {
            on: {
                [events.HOME]: states.HOME,
                [events.START]: states.GAME,
            },
        },
        [states.GAME]: {
            on: {
                [events.GAME_OVER]: states.SCORE,
                [events.RESTART]: states.GAME,
                [events.STOP]: states.HOME,
            },
        },
        [states.SCORE]: {
            on: {
                [events.HOME]: states.HOME,
                [events.START]: states.GAME,
            },
        },
    },
};

const stateMachine: machine.Machine = machine.factory(stateConfig);

window.console.log('just a placeholder...');
