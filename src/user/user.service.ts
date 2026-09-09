import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

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


    findOneUser(id: number) {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }


    createUser(dto: CreateUserDto) {
        this.logger.log(`Creating user with data: ${JSON.stringify(dto)}`);

        // Implementation for creating a new user
        const newUser: User = {
            id: this.users.length + 1,
            ...dto
        };

        this.users.push(newUser);

        return newUser;
    }


    updateUser(id: number, dto: UpdateUserDto) {
        this.logger.log(`Updating user with ID: ${id} and data: ${JSON.stringify(dto)}`);

        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return null; // User not found
        }

        const updatedUser = { ...this.users[index], ...dto };
        this.users[index] = updatedUser;

        return updatedUser;
    }


    deleteUser(id: number) {
        this.logger.log(`Deleting user with ID: ${id}`);

        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return null; // User not found
        }

        const [deleted] = this.users.splice(index, 1);

        return deleted;
    }

}   

// UserController -> needs UserService
// UserService    -> needs LoggerService
// Nest           -> creates and connects everything together  