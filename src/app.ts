import {
    bookTitleTransform,
    calcTotalPages,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookTitlesByCategory,
    getProperty,getGenericProperty,
    getTitles,
    logBookTitles,
    logFirstAvailable,
    printBook,
    printRefBook,
    showHello,
} from './functions';
import { Category } from './enums';
import { Book, Librarian, Logger, Magazine } from './interfaces';
import { Library, RefBook, Shelf, UL } from './classes';

showHello('greeting', 'TypeScript');


const bookTitles: string[] = getAllBooks().map(book => book.title);


logFirstAvailable(getAllBooks());


console.log(`HEre are books with CSS category ${JSON.stringify(getBookTitlesByCategory(Category.CSS))}`);
logBookTitles(bookTitles);


console.log(`Book with index #3 is ${getBookAuthorByIndex(3)}`);


console.log(`Total pages in libraries = ${calcTotalPages()}`);


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


bookTitleTransform('123456');
// bookTitleTransform(123456);


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
// myBook.markDamaged('jjj'); // TS considers not a const, but type and type can have no markDamaged property (not mandatory)


const logDamage: Logger = (reason: string): void => {
    console.log(reason + 'damaged');
};

logDamage('no cover');


const favLibrarian: Librarian = {
    name: 'Anna',
    email: 'fdf@fdsfs.com',
    department: 'fdsfdsfds',
    assistCustomer(name: string) {
        console.log(name);
    },
};


console.log(getProperty(myBook, 'title'));
console.log(getProperty(myBook, 'markDamaged'));
console.log(getProperty(myBook, 'available'));


let refBook = new RefBook(1, 'title', 2003, 5);
refBook.printCitation();
let p = Object.getPrototypeOf(refBook);
p = Object.getPrototypeOf(p);
p.printItem();

printRefBook(refBook);


const favLibrarian1: Librarian = new UL.UniversityLibrarian();
favLibrarian1.name = 'Anna';
favLibrarian1.assistCustomer('Boris');


// Dynamic import;
const flag = false;
if (flag) {
    // topLevelAwait: true,
    const module = await import('./classes');
    const reader = new module.Reader();
    reader.name = 'Anna';
    console.log(reader);
} else {
    // topLevelAwait: false,
    import('./classes').then((module) => {
        const reader = new module.Reader();
        reader.name = 'Anna';
        console.log(reader);
    }).catch((err) => {
        console.log(err);
    });
}


let library: Library;


let inventory: Book[] = [
    {
        id: 1,
        title: 'Refactoring JavaScript',
        author: 'Evan Burchard',
        available: true,
        category: Category.Software,
    },
    {
        id: 2,
        title: 'JavaScript Testing',
        author: 'Liang Yuxian Eugene',
        available: false,
        category: Category.Software,
    },
    {
        id: 3,
        title: 'CSS Secrets',
        author: 'Lea Verou',
        available: true,
        category: Category.Software,
    },
    {
        id: 4,
        title: 'Mastering JavaScript Object-Oriented Programming',
        author: 'Andrea Chiarelli',
        available: true,
        category: Category.Software,
    },
];


// const result = purge(inventory);
// console.log(result);

const bookShelf: Shelf<Book> = new Shelf();
inventory.forEach(book => bookShelf.addItem(book));
console.log(bookShelf.getFirst());

let magazines: Magazine[] = [
    { title: 'Magazine1', publisher: 'publishe1' },
    { title: 'Magazine2', publisher: 'publisher2' },
];

const magShelf = new Shelf<Magazine>();
magazines.forEach(mag => magShelf.addItem(mag));
console.log(magShelf.getFirst());

console.clear();
magShelf.printTitles();
console.log(magShelf.find('Magazine2'));


const genericProperty = getGenericProperty(bookShelf,'printTitles');
console.log(genericProperty);

console.log(getGenericProperty<number,'toString'>(10,'toString'));
