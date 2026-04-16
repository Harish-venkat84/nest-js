import { BadRequestException } from '@nestjs/common';

export class ValidationErrorException extends BadRequestException {}
