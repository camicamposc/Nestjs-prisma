import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
    this.logger.log('Ejecutando getAll de User Service')
    const user = await this.prisma.user.findMany();
    this.logger.log('findAll ejecutado correctamente')
    return user;
  }

  async findOne(id: number) {
    this.logger.log('Ejecutando findOne de User Service')
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) {
      this.logger.error(`id ${id} not found de prueba logger`)
      throw new NotFoundException(`id ${id} not found`);
    }
    this.logger.log('Ejecutando con exito findOne de User Service')
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log('Ejecutando update de User Service')
    const userId = await this.prisma.user.findUnique({ where: { id } });
    if(!userId) {
      this.logger.error('id ${id} not found, message logger')
      throw new NotFoundException(`id ${id} not found`);
    }
    const user = await this.prisma.user.update({ where: {id}, data: updateUserDto })
    this.logger.log('Update fue ejecutado correctamente con messaje logger')
    return user;
  }

  async remove(id: number) {
    this.logger.log('Ejecutando Remove de User Service')
    const userId = await this.prisma.user.findUnique({ where: { id } });
    if(!userId) {
      this.logger.error('id ${id} not found, message logger')
      throw new NotFoundException(`id ${id} not found`);
    }
    const user = await this.prisma.user.delete({ where: { id } })
    this.logger.log('Remove fue ejecutado correctamente')
    return user;
  }
}
