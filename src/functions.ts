import { Category } from './enums';
import { BookProperties, Library } from './types';
import { Book, Callback } from './interfaces';
import RefBook from './classes/encyclopedia';

export function printBook(book: Book): void {
    console.log(`${book.title} - ${book.author}`);
}


export function assertsStringValue(str: any): asserts str is string {
    if (typeof str !== 'string') {
        throw new Error('Parameter should be string');
    }
}


export function bookTitleTransform(title: any): string | never {
    assertsStringValue(title);
    return [...title].reverse().join('');
}

export function getProperty(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    }
    return book[prop];
}

export function getGenericProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    if (typeof obj[prop] === 'function') {
        return obj[prop]['name'];
    }
    return obj[prop];
}

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    // elt.innerText = `Hello from ${name}`;
}

export function getAllBooks(): ReadonlyArray<Book> {
    return <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript,
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS,
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript,
        },
    ];
}

export function logFirstAvailable(books: ReadonlyArray<Book> = []): void {
    const bookQuantity: number = books.length;
    const fistAvailableBook: Book | undefined = books.find((book: Book) => book.available);

    console.log(`Quantity of books = ${bookQuantity}. First available book is ${fistAvailableBook?.title}`);
}


export function getBookTitlesByCategory(category: Category = Category.JavaScript): string [] {
    const books: ReadonlyArray<Book> = getAllBooks();
    const titles: string[] = books.filter((book: Book) => book.category === category).map(book => book.title);
    return titles;
}

export function logBookTitles(titles: string[]): void {
    console.log(titles);
}


export function getBookAuthorByIndex(bookIndex: number): [title: string, author: string] {
    const selectedBook: Book = getAllBooks()[bookIndex];

    return [selectedBook.title, selectedBook.author];
}

export function calcTotalPages(): bigint {
    const librariesContent: Library[] = [
        {
            lib: 'libName1',
            books: 1_000_000_000,
            avgPagesPerBook: 250,
        },
        {
            lib: 'libName2',
            books: 5_000_000_000,
            avgPagesPerBook: 300,
        },
        {
            lib: 'libName3',
            books: 3_000_000_000,
            avgPagesPerBook: 280,
        },
    ];

    const totalPagesInLibraries: number = librariesContent.reduce((sum, library) => {
        return sum + library.books * library.avgPagesPerBook;
    }, 0);

    return BigInt(totalPagesInLibraries);
}


export function createCustomerID(name: string, id: number): string {
    return `${id}-${name}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`customer name :${name}`);
    if (age) {
        console.log(`age: ${age}`);
    }
    if (city) {
        console.log(`city: ${city}`);
    }
}

export function getBookByID(id: number): Book | undefined {
    return getAllBooks().find((book) => book.id === id);
}

export function checkoutBooks(customer: string, ...booksIDs: number[]): string[] {
    console.log(`customer name: ${customer}`);
    return booksIDs.map((id) => getBookByID(id))
        .filter(book => book !== undefined)
        .filter(book => !!book && book.available)
        .map(book => {
            if (book) {
                return book.title;
            }
            return '';
        }).filter(title => title !== '');
}

/* eslint-disable no-redeclare */
export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    return [];
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('it is not instnce of a book');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}


export function purge<T>(inputArray: Array<T>): Array<T> {
    return inputArray.slice(2);
}

export function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T,
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }

}


export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });

}

export async function logSearchResults(category: Category) {
    const result = await getBooksByCategoryPromise(category);
    console.log(result.length);
}
