export function UUID(): string {
    let s4 = function(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return s4() + s4() + '-' +
        s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + s4() + s4();
}
