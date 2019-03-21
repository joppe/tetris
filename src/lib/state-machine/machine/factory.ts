import { IStates } from '../state/IStates';
import { IMachine } from './IMachine';

export function factory({ initial, states }: IStates): IMachine {
    const history: string[] = [];

    return {
        history: (): string[] => history,
        initial: (): string => initial,
        transition: (current: string = initial): (event: string) => string => {
            return (event: string): string => {
                const next: string | undefined = states[current].on[event];

                if (next === undefined) {
                    return current;
                }

                history.push(next);

                return next;
            };
        }
    };
}
