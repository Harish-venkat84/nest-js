import { BadRequestException, ValidationError } from '@nestjs/common';

export const ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    return new BadRequestException(validationErrors);
  },
};
