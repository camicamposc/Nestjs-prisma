import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.log('Ejecutando create de User Service')
    try {
      const user = await this.prisma.user.create({data: createUserDto});
      this.logger.log('Create se ejecutó correctamente')
      return user; 
    } catch (error) {
      this.logger.error('No se pudo crear el registro')
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      this.logger.log('User findAll is running')
      const users = await this.prisma.user.findMany();
      this.logger.log('User findAll has been successfully executed')    
      return users;
    } catch (error) {
      this.logger.error('Internal server error occurred')
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    this.logger.warn('User findOne is running')
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) {
      // this.logger.error(`id ${id} not found`)
      throw new NotFoundException(`id ${id} not found`);
    }
    this.logger.log('User findOne has been successfully executed')
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.warn('User update is running')
    await this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    this.logger.log('User update has been successfully executed')
    return user;
  }

  async remove(id: number) {
    this.logger.warn('User remove is running')
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    this.logger.log('User remove has been successfully executed')
    return user;
  }
}
