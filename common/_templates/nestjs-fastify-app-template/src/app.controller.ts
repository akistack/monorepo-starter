import { Controller, Get } from '@nestjs/common';

// oxlint-disable-next-line typescript-eslint/consistent-type-imports -- Nest DI needs the runtime constructor metadata.
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
