import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse, ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity, description: 'The user has been successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBadRequestResponse({description: "'Bad Request", })
  findAll() {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBadRequestResponse({description: "'Bad Request", })
  async findOne(@Param('id') id: string) {
    const users = await this.userService.findOne(+id)
    return users;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBadRequestResponse({description: "'Bad Request", })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.userService.update(+id, updateUserDto);
    return user;
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({ status: 201, description: 'The user has been successfull deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
