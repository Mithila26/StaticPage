import { TestBed } from '@angular/core/testing';

import { AppMaterialModuleService } from './app.material-module.service';

describe('AppMaterialModuleService', () => {
  let service: AppMaterialModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMaterialModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
