/* eslint-disable no-redeclare */
showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    // elt.innerText = `Hello from ${name}`;
}

// type Book = { id: number; title: string; author: string; available: boolean; category: Category };
type Books = Book[];
type Library = { lib: string; books: number; avgPagesPerBook: number };

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

function getAllBooks(): ReadonlyArray<Book> {
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

const bookTitles: string[] = getAllBooks().map(book => book.title);

function logFirstAvailable(books: ReadonlyArray<Book> = []): void {
    const bookQuantity: number = books.length;
    const fistAvailableBook: Book | undefined = books.find((book: Book) => book.available);

    console.log(`Quantity of books = ${bookQuantity}. First available book is ${fistAvailableBook?.title}`);
}

logFirstAvailable(getAllBooks());

function getBookTitlesByCategory(category: Category = Category.JavaScript): Books | [] {
    const books: ReadonlyArray<Book> = getAllBooks();
    return books.filter((book: Book) => book.category === category);
}

function logBookTitles(titles: string[]): void {
    console.log(titles);
}

console.log(`HEre are books with CSS category ${JSON.stringify(getBookTitlesByCategory(Category.CSS))}`);
logBookTitles(bookTitles);

function getBookAuthorByIndex(bookIndex: number): [title: string, author: string] {
    const selectedBook: Book = getAllBooks()[bookIndex];

    return [selectedBook.title, selectedBook.author];
}

console.log(`Book with index #3 is ${getBookAuthorByIndex(3)}`);

function calcTotalPages(): bigint {
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

console.log(`Total pages in libraries = ${calcTotalPages()}`);

function createCustomerID(name: string, id: number): string {
    return `${id}-${name}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`customer name :${name}`);
    if (age) {
        console.log(`age: ${age}`);
    }
    if (city) {
        console.log(`city: ${city}`);
    }
}

function getBookByID(id: number): Book | undefined {
    return getAllBooks().find((book) => book.id === id);
}

function checkoutBooks(customer: string, ...booksIDs: number[]): string[] {
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

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
    return [];
}

const myID: string = createCustomerID('Ann', 10);
console.log(myID);

let idGenerator: typeof createCustomerID;
idGenerator = (name: string, id: number) => `${id}-${name}`;

const a = typeof 'Hello';


createCustomer('1');
createCustomer('2', 30);
createCustomer('3', 40, 'NY');

console.log(getBookTitlesByCategory(undefined));
console.log(getTitles(1, false));


function assertsStringValue(str: any): asserts str is string {
    if (typeof str !== 'string') {
        throw new Error('Parameter should be string');
    }
}


function bookTitleTransform(title: any): string | never {
    assertsStringValue(title);
    return [...title].reverse().join('');
}

bookTitleTransform('123456');
bookTitleTransform(123456);

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

function printBook(book: Book): void {
    console.log(`${book.title} - ${book.author}`);
}

const myBook: Book = {
    id: 5,
    title: 'dfdfsd',
    author: 'dfsdfsdfsd',
    available: true,
    category: Category.JavaScript,
    // year: 2015,
    // copies: 3,
    pages: 200,
    markDamaged: (reason: string): void => {
        console.log(reason + 'damaged');
    },
};

printBook(myBook);
myBook.markDamaged('jjj'); // TS considers not a const, but type and type can have no markDamaged property (not mandatory)

interface DamageLogger {
    (reason: string): void;
}

const logDamage: DamageLogger = (reason: string): void => {
    console.log(reason + 'damaged');
};

logDamage('no cover');

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

const favLibrarian: Librarian = {
    name: 'Anna',
    email: 'fdf@fdsfs.com',
    department: 'fdsfdsfds',
    assistCustomer(name: string) {
        console.log(name);
    },
};

type BookProperties = keyof Book;

function getProperty(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    }
    return book[prop];
}

console.log(getProperty(myBook, 'title'));
console.log(getProperty(myBook, 'markDamaged'));
console.log(getProperty(myBook, 'available'));

