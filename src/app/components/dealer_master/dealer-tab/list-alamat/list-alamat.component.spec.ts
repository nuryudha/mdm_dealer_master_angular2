import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlamatComponent } from './list-alamat.component';

describe('ListAlamatComponent', () => {
  let component: ListAlamatComponent;
  let fixture: ComponentFixture<ListAlamatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAlamatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlamatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
