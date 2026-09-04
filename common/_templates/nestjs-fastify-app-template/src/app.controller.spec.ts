import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from '@rstest/core';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get(AppController);
  });

  it('returns the greeting', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});
