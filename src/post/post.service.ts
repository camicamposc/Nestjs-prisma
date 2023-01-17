import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name)
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    this.logger.log('Ejecutando create de Post Service')
    try {
      const post = await this.prisma.post.create({data: createPostDto});
      this.logger.log('Create se ejecuto correctamente')
      return post;
    } catch (error) {
      this.logger.error('No se pudo crear el registro')
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    this.logger.log('Ejecutando getAll de Post Service')
    const post = await this.prisma.post.findMany();
    this.logger.log('findAll ejecutado correctamente')
    return post;
  }

  async findOne(id: number) {
    this.logger.log('Ejecutando findOne de Post Service')
    const post = await this.prisma.post.findUnique({where:{id}});
    if(!post) {
      this.logger.error(`id ${id} not found de prueba logger`)
      throw new NotFoundException(`id ${id} not found`);
    }
    this.logger.log('Ejecutando con exito findOne de Post Service')
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    this.logger.log('Ejecutando update de Post Service')
    const postId = await this.prisma.post.findUnique({where: {id}});
    if(!postId) {
      this.logger.error('id ${id} not found, message logger')
      throw new NotFoundException(`id ${id} not found`);
    }
    const post = await this.prisma.post.update({where:{id}, data: updatePostDto})
    this.logger.log('Update fue ejecutado correctamente con messaje logger')
    return post;
  }

  async remove(id: number) {
    this.logger.log('Ejecutando Remove de Post Service')
    const postId = await this.prisma.post.findUnique({where: {id}});
    if(!postId) {
      this.logger.error('id ${id} not found, message logger')
      throw new NotFoundException(`id ${id} not found`);
    }
    const post = await this.prisma.post.delete({where: {id} })
    this.logger.log('Remove fue ejecutado correctamente')
    return post;
  }
}
