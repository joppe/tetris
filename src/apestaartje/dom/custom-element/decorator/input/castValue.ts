export function castValue(value: string | null, type: string): string | number | boolean | object | undefined {
    if (value === null) {
        return undefined;
    }

    switch (type) {
        case 'bool':
            if (value !== 'true' && value !== 'false') {
                throw new Error(`Cannot cast ${value} to "bool"`);
            }

            return value === 'true';
        case 'int':
            const i: number = parseInt(value, 10);

            if (isNaN(i)) {
                throw new Error(`Cannot cast ${value} to "int"`);
            }

            return i;
        case 'float':
            const f: number = parseFloat(value);

            if (isNaN(f)) {
                throw new Error(`Cannot cast ${value} to "float"`);
            }

            return f;
        case 'json':
            return <object>JSON.parse(value);
        default:
            return value;
    }
}
