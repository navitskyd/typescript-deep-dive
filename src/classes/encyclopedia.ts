import { RefItem } from '../classes';
import { positiveInteger } from './decorators';

export default class Encyclopedia extends RefItem {
    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    private _copies: number;
    get copies(): number {
        return this._copies;
    }

    @positiveInteger
    set copies(value: number) {
        this._copies = value;
    }

    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} = ${this.year}`);
    }
}
