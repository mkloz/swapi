import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @HttpCode(HttpStatusCode.Ok)
  hello() {
    return 'Hello from Server!';
  }
}
