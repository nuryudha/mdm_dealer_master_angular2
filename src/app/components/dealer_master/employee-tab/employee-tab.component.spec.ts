import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTabComponent } from './employee-tab.component';

describe('EmployeeTabComponent', () => {
  let component: EmployeeTabComponent;
  let fixture: ComponentFixture<EmployeeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
