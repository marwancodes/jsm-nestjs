import { Injectable } from '@nestjs/common';
import { LoggerService } from './user.logger.js';

interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {

    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Mary Jane', email: 'mary.jane@example.com' },
        { id: 3, name: 'Peter Parker', email: 'peter.parker@example.com' }
    ];

    findAllUsers(name?: string) {

        this.logger.log(`Fetching users with name filter: ${name}`);

        return this.users.filter(user => 
            !name || user.name.toLowerCase().includes(name.toLowerCase()),
        );
    }

}   
