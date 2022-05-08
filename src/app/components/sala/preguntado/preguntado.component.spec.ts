import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadoComponent } from './preguntado.component';

describe('PreguntadoComponent', () => {
  let component: PreguntadoComponent;
  let fixture: ComponentFixture<PreguntadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
