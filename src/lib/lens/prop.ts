import { Getter } from './Getter';

export function prop<T>(property: keyof T): Getter<T> {
    return (obj: T): T[keyof T] => {
        return obj[property];
    };
}
