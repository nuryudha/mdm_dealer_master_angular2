import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDealerComponent } from './main-dealer.component';

describe('MainDealerComponent', () => {
  let component: MainDealerComponent;
  let fixture: ComponentFixture<MainDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
