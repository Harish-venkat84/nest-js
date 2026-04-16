import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationErrorException } from '../exceptions';

@Catch(ValidationErrorException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationErrorException, host: ArgumentsHost) {
    const response: any = exception.getResponse();
    const message = response.message;
    const errors = this.getErrors(message);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    return res.status(422).json({
      statusCode: 422,
      errors: errors,
    });
  }

  getErrors(message) {
    if (typeof message === 'string') return message;
    const errors = {};
    for (let index = 0; index < message.length; index++) {
      const element = message[index];
      if (element.children && element.children.length) {
        errors[element.property] = this.getErrors(element.children);
      } else {
        errors[element.property] = [Object.values(element.constraints)[0]];
      }
    }
    return errors;
  }
}
