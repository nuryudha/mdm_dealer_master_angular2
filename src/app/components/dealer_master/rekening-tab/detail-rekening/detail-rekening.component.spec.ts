import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRekeningComponent } from './detail-rekening.component';

describe('DetailRekeningComponent', () => {
  let component: DetailRekeningComponent;
  let fixture: ComponentFixture<DetailRekeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRekeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
