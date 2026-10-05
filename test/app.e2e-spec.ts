/*
 * File: app.e2e-spec.ts
 * Project: nestjs-tasks
 * Created: Sunday, August 30th 2026, 10:31:38 am
 * Last Modified: Monday, October 5th 2026, 8:19:25 am
 * Copyright © 2026 AMDE Agência
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
