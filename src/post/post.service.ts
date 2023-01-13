import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({data: createPostDto});
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    const post = await this.prisma.post.findMany();
    return post;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({where:{id}});
    if(!post) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const postId = await this.prisma.post.findUnique({where: {id}});
    if(!postId) {
      throw new NotFoundException(`id ${id} not found`);
    }
    const post = await this.prisma.post.update({where:{id}, data: updatePostDto})
    return post;
  }

  async remove(id: number) {
    const postId = await this.prisma.post.findUnique({where: {id}});
    if(!postId) {
      throw new NotFoundException(`id ${id} not found`);
    }
    const post = await this.prisma.post.delete({where: {id} })
    return post;
  }
}
