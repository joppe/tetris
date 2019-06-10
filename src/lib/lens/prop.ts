import { Getter } from './Getter';

export function prop<T>(property: keyof T): Getter<T, T[keyof T]> {
    return (obj: T): T[keyof T] => {
        return obj[property];
    };
}
