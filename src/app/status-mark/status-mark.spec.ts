import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMark } from './status-mark';

describe('StatusMark', () => {
  let component: StatusMark;
  let fixture: ComponentFixture<StatusMark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusMark],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusMark);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
