import * as interfaces from '../interfaces';
import { logMethod, logParam, sealed, writeable } from './decorators';

@sealed('UniversityLibrarian')
// @logger
export class UniversityLibrarian implements interfaces.Librarian {
    department: string;
    email: string;
    name: string;

    @logMethod
    assistCustomer(@logParam custName: string): void {
        console.log(`${this.name} is assisitng ${custName}`);
    }

    // @writeable(true)
    assistFaculty(): void {
        console.log('Assisting Faculty');
    }

    // @writeable(false)
    teachCommunity(): void {
        console.log('Teaching Community');
    }
}
