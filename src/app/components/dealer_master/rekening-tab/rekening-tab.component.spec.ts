import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekeningTabComponent } from './rekening-tab.component';

describe('RekeningTabComponent', () => {
  let component: RekeningTabComponent;
  let fixture: ComponentFixture<RekeningTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekeningTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekeningTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
