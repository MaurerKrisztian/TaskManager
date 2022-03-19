import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinetasksComponent } from './timelinetasks.component';

describe('TimelinetasksComponent', () => {
  let component: TimelinetasksComponent;
  let fixture: ComponentFixture<TimelinetasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinetasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinetasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
