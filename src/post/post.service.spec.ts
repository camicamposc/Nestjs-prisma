/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { arrayPost, post } from '../../_Mock/postMock';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';

describe('PostService', () => {
    let postService: PostService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [PostService, PrismaService],   // Add
        }).compile();

        postService = moduleRef.get<PostService>(PostService);
        prisma = moduleRef.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(postService).toBeDefined();
    });

    it('should return post create', async() => {
        prisma.post.create = jest.fn().mockResolvedValue(post);
        const postC = await postService.create(post);
        expect(postC).toEqual(post);
    })

    it('should return not created', async() => {
        prisma.post.create = jest.fn().mockRejectedValue(new Error);
        try {
            const postCr = await postService.create(post);
        } catch (error) {
            expect(error).toBeInstanceOf(InternalServerErrorException);
        }
    })

    it('should return array post findAll', async() => {
        prisma.post.findMany = jest.fn().mockResolvedValue(arrayPost);
        const post = await postService.findAll();
        expect(post).toEqual(arrayPost);
    });

    it('shloud return not found not found exception post findAll', async() => {
        prisma.post.findMany = jest.fn().mockRejectedValue(new Error);
        try {
            const post = await postService.findAll();
        } catch (error) {
            expect(error).toBeInstanceOf(InternalServerErrorException);
        }
    });

    it('should return a post finsOne', async() =>{
        prisma.post.findUnique = jest.fn().mockResolvedValue(post);
        const id = 1
        const userP = await postService.findOne(id);
        expect(userP).toEqual(post);
    });

    it('should return not found exception post findOne', async() => {
        prisma.post.findUnique = jest.fn().mockResolvedValue(null);
        const id = 100
        try {
            const userP = await postService.findOne(id);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);            
        }
    });

    it('should return post update', async() => {
        prisma.post.update = jest.fn().mockResolvedValue(post);
        const id = 1
        const postU = await postService.update(id, post);
        expect(postU).toBe(post);
    })

    it('should return post remove', async() => {
        prisma.post.delete = jest.fn().mockResolvedValue(post);
        const id = 1
        try {
            const postDel = await postService.remove(id);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});
