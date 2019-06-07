export function assocPath(p) {
    function loop(p, v, obj) {
        const prop = p[0];

        if (p.length > 1) {
            const n = obj[prop] !== undefined ? obj[prop] : Number.isInteger(p[1]) ? [] : {};
            v = loop(p.slice(1), v, n);
        }

        if (Number.isInteger(prop)) {
            const t = [...obj];

            t[prop] = v;

            return t;
        } else {
            return assoc(prop)(v, obj);
        }
    }

    return (v, obj) => {
        return loop(p, v, obj);
    };
}
