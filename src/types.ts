// type Book = { id: number; title: string; author: string; available: boolean; category: Category };
import { Author, Book, Person } from './interfaces';

type Books = Book[];
type Library = { lib: string; books: number; avgPagesPerBook: number };

type BookProperties = keyof Book;
type PersonBook = Person & Book;

type BookRequiredFields = Required<Book>;
type UpdatedBook = Partial<Book>;
type AuthorWoEmail = Omit<Author, 'email'>;

type fn = (p1: string, p2: number, p3: boolean) => symbol;
type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

type Unpromisify<T> = T extends Promise<infer R> ? R : never;
export { Unpromisify, fn, Books, Library, UpdatedBook, AuthorWoEmail, BookProperties, BookRequiredFields, PersonBook };
