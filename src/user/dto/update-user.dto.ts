import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {} // you can use PartialType to create a DTO for updating a user, which will have all the properties of CreateUserDto but optional.