/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { arrayUser, user } from '../../_Mock/userMock';
import { UserService } from './user.service';

describe('UserService', () => {
    let userService: UserService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [UserService, PrismaService],   // Add
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        prisma = moduleRef.get<PrismaService>(PrismaService);

    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('should return array user findAll', async() => {
       prisma.user.findMany = jest.fn().mockResolvedValue(arrayUser);
       const users = await userService.findAll();
       expect(users).toEqual(arrayUser);
    });

    it('should return a user findOne', async() => {
        prisma.user.findUnique = jest.fn().mockResolvedValue(user);
        const id = 1
        const userD = await userService.findOne(id);
        expect(userD).toEqual(user);
    });
    
    it('should return not found exception user findOne', async () => {
        prisma.user.findUnique = jest.fn().mockResolvedValue(null);
        const id = 100
        try {
            const userD = await userService.findOne(id);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});
