import { States } from '@apestaartje/finite-state-machine/dist/state/States';

import { Event } from '@tetris/finite-state-machine/game/Event';
import { State } from '@tetris/finite-state-machine/game/State';

export const config: States = {
    initial: State.Play,
    states: {
        [State.Land]: {
            on: {
                [Event.CountDown]: State.CountDown,
            },
        },
        [State.CountDown]: {
            on: {
                [Event.Play]: State.Play,
                [Event.Reset]: State.Land,
            },
        },
        [State.Play]: {
            on: {
                [Event.GameOver]: State.GameOver,
                [Event.Reset]: State.Land,
            },
        },
        [State.GameOver]: {
            on: {
                [Event.Restart]: State.Land,
                [Event.Reset]: State.Land,
            },
        },
    },
};
