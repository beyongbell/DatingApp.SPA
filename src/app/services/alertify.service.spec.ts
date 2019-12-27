import { TestBed } from '@angular/core/testing';

import { AlertifyServiceService } from './alertify-service.service';

describe('AlertifyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertifyServiceService = TestBed.get(AlertifyServiceService);
    expect(service).toBeTruthy();
  });
});
