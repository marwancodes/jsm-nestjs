import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {

    // @Get('all')      // GET /user/all  - always put the static segment first before the dynamic segment
    // @Get(':id')      // GET /user/:id  - dynamic segment
    // @Post()          // POST /user
    // @Put(':id')      // PUT /user/:id
    // @Delete(':id')   // DELETE /user/:id


    constructor(private readonly userService: UserService) {} // inject the UserService into the UserController

    // GET /user
    @Get()
    getUsers(@Query('name') name: string): unknown {

        return this.userService.findAllUsers(name);

        // const users = [
        //     {id: 1, name: 'John Doe'},
        //     {id: 2, name: 'Mary Jane'},
        //     {id: 3, name: 'Peter Parker'},
        // ];

        // if (name) {
        //     return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        // }
        // return users;
    }

    @Get(':id')
    getUserById(@Param('id') id: string): unknown {
        return this.userService.findOneUser(Number(id));
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return { data: createUserDto, message: 'User created successfully' };
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return { data: { id, ...updateUserDto }, message: 'User updated successfully' };
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return { data: { id }, message: 'User deleted successfully' };
    }
}
