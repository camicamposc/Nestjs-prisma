/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

@Catch(NotFoundException, InternalServerErrorException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus(); 
    const message = exception.message;

    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
      path: request.url,
    });
  }
}
