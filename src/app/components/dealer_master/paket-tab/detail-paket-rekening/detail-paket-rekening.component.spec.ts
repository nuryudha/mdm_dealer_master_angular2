import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaketRekeningComponent } from './detail-paket-rekening.component';

describe('DetailPaketRekeningComponent', () => {
  let component: DetailPaketRekeningComponent;
  let fixture: ComponentFixture<DetailPaketRekeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPaketRekeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPaketRekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
