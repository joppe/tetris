export interface CustomElementFactory<T> {
    // tslint:disable-next-line no-reserved-keywords
    (constructor: T): T;
}
