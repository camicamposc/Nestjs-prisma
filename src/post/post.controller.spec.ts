/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
    let postController: PostController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [PostController], // Add
            providers: [PostService, PrismaService],   // Add
        }).compile();

        postController = moduleRef.get<PostController>(PostController);
    });

    it('should be defined', () => {
        expect(postController).toBeDefined();
    });
});
