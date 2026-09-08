import { Controller, Get, Query, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
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
    getUserById(@Param('id', ParseIntPipe) id: number): unknown {
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): unknown {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): unknown {
        return this.userService.updateUser(Number(id), updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): unknown {
        return this.userService.deleteUser(Number(id));
    }
}
