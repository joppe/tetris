export interface IMachine {
    initial(): string;
    history(): string[];
    transition(): (event: string) => string;
}
