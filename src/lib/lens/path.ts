import { Getter } from './Getter';
import { PathPart } from './PathPart';

function path<T>(pathParts: PathPart[]): Getter<T> {
    function loop<K>(p: PathPart[], obj: K): K[keyof K] {
        const prop: PathPart = p[0];

        if (p.length === 1) {
            return obj[prop];
        }

        return loop(p.slice(1), obj[prop]);
    }

    return (obj: T) => {
        return loop(pathParts, obj);
    };
}
