/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { arrayUser, createUser, user } from '../../_Mock/userMock';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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

    it('should return create user', async() => {
        // prisma.user.create = jest.fn().mockResolvedValue(createUser);
        // const dto = new createUser();
        // const userC = await userService.create(dto);  
        // expect(userC).toStrictEqual(dto);     
        prisma.user.create = jest.fn().mockResolvedValue(user);
        const userC = await userService.create(user);  
        expect(userC).toBe(user); 
    });

    it('should return not created', async() => {
        prisma.user.create = jest.fn().mockRejectedValue(new Error());
        try {
            const userCr = await userService.create(user);
        } catch (error) {
            expect(error).toBeInstanceOf(InternalServerErrorException);            
        }
    });

    it('should return array user findAll', async() => {
       prisma.user.findMany = jest.fn().mockResolvedValue(arrayUser);
       const users = await userService.findAll();
       expect(users).toEqual(arrayUser);
    });

    it('should return not found exception user findAll', async() => {
        prisma.user.findMany = jest.fn().mockRejectedValue(new Error());
        try {
            const users = await userService.findAll(); 
        } catch (error) {
            expect(error).toBeInstanceOf(InternalServerErrorException);
        }
    })

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

    it('should return not found update', async () => {
        prisma.user.update = jest.fn().mockResolvedValue(user);
        const id = 1
        const userU = await userService.update(id, user);
        expect(userU).toBe(user);        
    });

    it('should return user remove', async() => {
        prisma.user.delete = jest.fn().mockResolvedValue(user);
        const id = 1
        try {
            const userDel = await userService.remove(id);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});
