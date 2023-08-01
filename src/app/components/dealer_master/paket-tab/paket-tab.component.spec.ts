import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketTabComponent } from './paket-tab.component';

describe('PaketTabComponent', () => {
  let component: PaketTabComponent;
  let fixture: ComponentFixture<PaketTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaketTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaketTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
