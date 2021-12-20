// type Book = { id: number; title: string; author: string; available: boolean; category: Category };
import { Book, Person } from './interfaces';

type Books = Book[];
type Library = { lib: string; books: number; avgPagesPerBook: number };

type BookProperties = keyof Book;
type PersonBook = Person & Book;


export { Books, Library, BookProperties, PersonBook };
