import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errors = {};
    if (exception instanceof MongoServerError) {
      switch (exception.code) {
        case 11000:
          errors[Object.keys(exception.keyPattern)[0]] = [
            'Value should be unique',
          ];
      }
      return response.status(400).json({
        statusCode: 400,
        message: 'Validation Errors',
        errors: errors,
      });
    } else if (exception.errors && Object.keys(exception.errors).length) {
      const keys = Object.keys(exception.errors);
      keys.forEach((element) => {
        errors[element] = [exception.errors[element].message];
      });
      return response.status(400).json({
        statusCode: 400,
        message: 'Validation Errors',
        errors: errors,
      });
    }
  }
}
