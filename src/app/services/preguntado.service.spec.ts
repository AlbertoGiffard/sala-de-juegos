import { TestBed } from '@angular/core/testing';

import { PreguntadoService } from './preguntado.service';

describe('PreguntadoService', () => {
  let service: PreguntadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
