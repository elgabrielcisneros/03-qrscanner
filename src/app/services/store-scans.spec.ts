import { TestBed } from '@angular/core/testing';

import { StoreScans } from './store-scans';

describe('StoreScans', () => {
  let service: StoreScans;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreScans);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should store a scan log', () => {
    spyOn(service, 'storeScanLog');

    expect(service.storeScanLog).toHaveBeenCalled();
  });
});
