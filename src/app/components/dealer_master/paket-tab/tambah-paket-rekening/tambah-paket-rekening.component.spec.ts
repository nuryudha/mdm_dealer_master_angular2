import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahPaketRekeningComponent } from './tambah-paket-rekening.component';

describe('TambahPaketRekeningComponent', () => {
  let component: TambahPaketRekeningComponent;
  let fixture: ComponentFixture<TambahPaketRekeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahPaketRekeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahPaketRekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
