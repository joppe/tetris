import { IState } from './IState';

export interface IStates {
    initial: string;
    states: {[state: string]: IState};
}
