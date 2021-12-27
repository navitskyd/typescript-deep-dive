import { timeout } from './decorators';

export abstract class RefItem {
    // title: string;
    // year: number;
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('creating new RefItem...');
    //     this.year = newYear;
    //     this.title = newTitle;
    // }

    // private even on js side
    #_id: number;

    private _publisher: string;

    // will be undefined on class instance
    static department: string = 'Classic Literature';

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(id: number, public title: string, protected year: number) {
        console.log('creating new ref item...');
        this.#_id = id;
    }

    // @timeout(2000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${RefItem.department}`);
    }


    getID(): number {
        return this.#_id;
    }

    abstract printCitation(): void;
}
