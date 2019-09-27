const SELECTOR_RE: RegExp = /[a-z]+\-[a-z]+/;

export function isValidSelector(selector: string): boolean {
    return SELECTOR_RE.test(selector);
}
