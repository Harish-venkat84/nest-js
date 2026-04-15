import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = this.getErrorMessage(exception);
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: message,
    });
  }

  getErrorMessage(exception: HttpException) {
    const response = exception.getResponse();
    const message = response?.['message'] ?? response;
    console.log('+++++>>>', response);
    if (typeof message === 'string') return message;
    const errors = {};
    for (let index = 0; index < message.length; index++) {
      const element = message[index];
      if (element.children && element.children.length) {
        errors[element.property] = this.getErrorMessage(element.children);
      } else {
        errors[element.property] = [Object.values(element.constraints)[0]];
      }
    }
    return errors;
  }
}
