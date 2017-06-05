import { getTestBed, TestBed, inject, async } from '@angular/core/testing';
import { FakeBackend } from 'ngx-http-test';

import { EngineHttp } from './engineHttp';

describe('EngineHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EngineHttp,
        FakeBackend.getProviders()
      ],
    });
  });

  beforeEach(inject([EngineHttp, FakeBackend], (engine: EngineHttp, fakeBackend: FakeBackend) => {
    this.backend = fakeBackend;
    this.engine = engine;
  }));

  afterEach(() => {
    this.backend.verifyNoPendingRequests();
    this.backend.verifyNoPendingExpectations();
  });

  it('should fetch blog entry by a key', async(() => {
    this.backend.expectGet('api/models').respond([
      { id: 1, name: 'V12' },
      { id: 2, name: 'Twin' },
    ]);

    this.engine.getModels()
      .subscribe((models) => {
        expect(models.length).toBe(2);
      });
  }));

});
