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
import { HttpExceptionFilter } from 'src/common/exceptions/exception.filter';
import { ValidationPipeOptions } from 'src/common/pipe/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('login')
  @UsePipes(new ValidationPipe(ValidationPipeOptions))
  @UseFilters(new HttpExceptionFilter())
  login(@Query() query: LoginDto) {
    // throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
    };
  }
}
