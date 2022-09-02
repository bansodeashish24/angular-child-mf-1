import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMicroFrontend1V1Component } from './child-micro-frontend-1-v1.component';

describe('ChildMicroFrontend1V1Component', () => {
  let component: ChildMicroFrontend1V1Component;
  let fixture: ComponentFixture<ChildMicroFrontend1V1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildMicroFrontend1V1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildMicroFrontend1V1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
