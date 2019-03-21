import { Observable } from '../observable/Observable';

// tslint:disable-next-line no-any
export type Operator = (observable: Observable<any>) => Observable<any>;
