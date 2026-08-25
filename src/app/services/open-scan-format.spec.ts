import { TestBed } from '@angular/core/testing';

import { OpenScanFormat } from './open-scan-format';

describe('OpenScanFormat', () => {
  let service: OpenScanFormat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenScanFormat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
