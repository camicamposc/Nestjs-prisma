/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
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
});
