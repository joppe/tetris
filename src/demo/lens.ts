import * as lens from '@apestaartje/lens';
import * as store from '@apestaartje/store';

type Thermometer = { fahrenheit: number };

function celciusToFahrenheit(celclius: number): number {
    return celclius * (9 / 5) + 32;
}

function fahrenheitToCelcius(fahrenheit: number): number {
    return (fahrenheit - 32) * (5 / 9);
}

const initial: Thermometer = { fahrenheit: 70 };
const s: store.Store<Thermometer> = new store.Store<Thermometer>(initial);

const fahrenheitLens: lens.Lens<Thermometer, number> = lens.lens(
    (st: Thermometer): number => st.fahrenheit,
    (fahrenheit: number, st: Thermometer): Thermometer => {
        return {
            ...st,
            fahrenheit,
        };
    },
);

const fahrenheitPromap = s.promap(fahrenheitLens);

fahrenheitPromap.set((f: number): number => {
    return f + 5;
});

console.log('initial', initial);
console.log('new', fahrenheitPromap.data);
/*
const celcliusLens = lens.lens(
    (fahrenheit: number) => {
        console.log(fahrenheit);
        return fahrenheitToCelcius(fahrenheit)
    },
    (celclius, x) => {
        console.log('x', x);
        console.log('celcius', celclius);
        return celciusToFahrenheit(celclius);
    }
);

const celciusPromap = fahrenheitPromap.promap(celcliusLens);

console.log('celcius', celciusPromap.data);

// s2.set((c) => c + 20);

// console.log(s2.data);
*/
