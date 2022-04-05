import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEmailComponent } from './daily-email.component';

describe('DailyEmailComponent', () => {
  let component: DailyEmailComponent;
  let fixture: ComponentFixture<DailyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
