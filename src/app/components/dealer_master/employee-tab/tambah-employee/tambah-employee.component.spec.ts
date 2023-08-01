import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahEmployeeComponent } from './tambah-employee.component';

describe('TambahEmployeeComponent', () => {
  let component: TambahEmployeeComponent;
  let fixture: ComponentFixture<TambahEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
