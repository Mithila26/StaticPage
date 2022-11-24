import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUp1Component } from './pop-up1.component';

describe('PopUp1Component', () => {
  let component: PopUp1Component;
  let fixture: ComponentFixture<PopUp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUp1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
