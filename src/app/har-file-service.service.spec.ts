import { TestBed, inject } from '@angular/core/testing';

import { HarFileServiceService } from './har-file-service.service';

describe('HarFileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HarFileServiceService]
    });
  });

  it('should be created', inject([HarFileServiceService], (service: HarFileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
