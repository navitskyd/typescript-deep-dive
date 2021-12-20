import * as interfaces from '../interfaces';

export class UniversityLibrarian implements interfaces.Librarian {
    department: string;
    email: string;
    name: string;

    assistCustomer(custName: string): void {
        console.log(`${this.name} is assisitng ${custName}`);
    }

}
