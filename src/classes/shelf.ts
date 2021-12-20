import { Book, Magazine, ShelfItem } from '../interfaces';

export default class<T extends ShelfItem = ShelfItem> {
    private items: Array<T> = new Array<T>();

    addItem(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    find(title: string): T | undefined {
        return this.items.find(item => item.title === title);
    }

    printTitles() {
        this.items.forEach(item => console.log(item.title));
    }
}


// option 2

type Alias = Book | Magazine;

export class Shelf2 {
    private items: Array<Alias> = new Array<Alias>();

    addItem(item: Alias): void {
        this.items.push(item);
    }

    getFirst(): Alias {
        return this.items[0];
    }
}
