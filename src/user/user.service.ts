import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({data: createUserDto});
      return user; 
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    const user = await this.prisma.user.findMany();
    return user;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userId = await this.prisma.user.findUnique({ where: { id } });
    if(!userId) {
      throw new NotFoundException(`id ${id} not found`);
    }
    const user = await this.prisma.user.update({ where: {id}, data: updateUserDto })
    return user;
  }

  async remove(id: number) {
    const userId = await this.prisma.user.findUnique({ where: { id } });
    if(!userId) {
      throw new NotFoundException(`id ${id} not found`);
    }
    const user = await this.prisma.user.delete({ where: { id } })
    return user;
  }
}
