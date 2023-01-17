import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception/exception.filter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Request } from 'express';

@Module({
  imports: [ConfigModule.forRoot(), 
    
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV === 'development' ? {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
            ignore: 'time'
          },
        } : undefined,

        // transport: {
        //   target: 'pino-pretty',
        //   options: {
        //     messageKey: 'message'
        //   },
        // },

        // transport: process.env.NODE_ENV === 'development' ? {
        //   target: 'pino-http',
        //   options: {
        //     messageKey: 'message',
        //     ignore: 'time'
        //   },
        // } : undefined,
  
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            timestamp: new Date().toISOString(),
            // transactionId: req[TRANSACTION_ID_HEADER],
            // spanId: req[SPAN_ID_HEADER],
            // parentId: req[PARENT_ID_HEADER],
            env: process.env.NODE_ENV || 'dev',
            consumer: 11,
            component: '01-arch-typeorm: 1.0.0',
            payload: req.body,
  
            // myid: req.id
            // timestamp1: new Date().toISOString(),
            // id: req.id,
            // method: req.method,
            // url: req.url,
            // payload: req.body,
          };
        },
        autoLogging: false,
        serializers: {
          req: (req) => () => {
            return undefined
          },
          res: (res) => {
            return undefined
          },
        }
      },
    }),
    
    UserModule, PostModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }, PrismaService, AppService],
})
export class AppModule { }
