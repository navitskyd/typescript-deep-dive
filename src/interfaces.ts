import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;

    // markDamaged?: (reason: string) => void;
    // markDamaged?(reason: string): void;
    markDamaged?: DamageLogger;

    // [propertyName: string]: any;
}

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    booksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}


interface LibMgrCallback {
    (err: Error|null, titles: string[]|null): void;
}

interface Callback<T> {
    (err: Error|null, titles: T|null): void;
}

export { Magazine, ShelfItem, Callback, Book, LibMgrCallback, Librarian, DamageLogger as Logger, Person, Author };
