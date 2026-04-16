import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dot/login.dto';
import { ValidationPipeOptions } from 'src/common/pipe/validation.pipe';
import { MongoExceptionFilter } from 'src/common/filters/mongo_exception.filter';
import { ValidationFilter } from 'src/common/filters/validation_exception.filter';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('login')
  @UsePipes(new ValidationPipe(ValidationPipeOptions))
  @UseFilters(MongoExceptionFilter, ValidationFilter)
  login(@Query() query: LoginDto) {
    // throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
    };
  }
}
